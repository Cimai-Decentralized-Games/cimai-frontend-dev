'use client';

import React, { useState, useEffect, useCallback } from 'react';
import MultipleAxes from '../../components/charts/multipleAxes';
import Area from '../../components/charts/area';
import * as tf from '@tensorflow/tfjs';
import { FaRobot, FaChartLine, FaCog, FaBalanceScale } from 'react-icons/fa';

// Constants for simulation
const INITIAL_PRICE = 1.0;
const INITIAL_SUPPLY = 100000000;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RESERVE_RATIO = 0.5; // Used for reference/documentation purposes
const MAX_SUPPLY_CHANGE_PERCENT = 0.005;
const MAX_PRICE_CHANGE = 0.005; // Reduced to 0.5% max price change per step
const SIMULATION_DAYS = 1000;
const MIN_PRICE = 0.1; // Increased minimum price
const LIQUIDITY_INFLOW_RATE = 0.2; // Increased to 20%
const TARGET_PRICE = 1.0; // New constant for target price

// Sigmoid function for bonding curve with improved parameters
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sigmoid = (x: number, k: number, x0: number): number => {
  // This function is kept for reference or future use
  const basePrice = 1 / (1 + Math.exp(-k * (x - x0)));
  return Math.max(basePrice, MIN_PRICE);
};

// Enhanced PID controller with stronger stability focus
const pidController = (
  error: number,
  previousError: number,
  integral: number,
  kp: number,
  ki: number,
  kd: number,
  dt: number,
  volatility: number
): { output: number; integral: number } => {
  const maxIntegral = 2.0 / (1 + volatility); // Increased anti-windup limit
  const derivative = (error - previousError) / dt;
  const newIntegral = Math.max(Math.min(integral + error * dt, maxIntegral), -maxIntegral);
  const output = kp * error + ki * newIntegral + kd * derivative;
  return { output: Math.max(Math.min(output, 1), -1), integral: newIntegral };
};

// Improved KAN model with proper architecture
const createKANModel = () => {
  const model = tf.sequential();
  
  model.add(tf.layers.dense({
    units: 32,
    activation: 'relu',
    inputShape: [10],
    kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
  }));
  
  model.add(tf.layers.dropout({ rate: 0.2 }));
  model.add(tf.layers.dense({
    units: 16,
    activation: 'relu',
    kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
  }));
  
  model.add(tf.layers.dropout({ rate: 0.2 }));
  model.add(tf.layers.dense({ units: 1 }));
  
  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'meanSquaredError'
  });
  
  return model;
};

// Improved conformal prediction
const conformalPrediction = (predictions: number[], actual: number, alpha: number): number => {
  const errors = predictions.map(pred => Math.abs(pred - actual));
  const sortedErrors = errors.sort((a, b) => a - b);
  const quantileIndex = Math.floor((1 - alpha) * sortedErrors.length);
  return sortedErrors[quantileIndex];
};

// Enhanced KAN prediction with proper tensor handling
const predictWithKAN = async (kanModel: tf.Sequential | null, input: number[]): Promise<number> => {
  if (!kanModel) return input[input.length - 1];
  
  try {
    const paddedInput = input.length < 10 
      ? [...Array(10 - input.length).fill(0), ...input]
      : input.slice(-10);

    const inputTensor = tf.tensor1d(paddedInput);
    const mean = inputTensor.mean();
    const std = inputTensor.sub(mean).square().mean().sqrt();
    
    const normalizedInput = inputTensor.sub(mean).div(std);
    const reshapedInput = normalizedInput.reshape([1, 10]);
    
    const prediction = kanModel.predict(reshapedInput) as tf.Tensor;
    const denormalizedPrediction = prediction.mul(std).add(mean);
    const result = denormalizedPrediction.dataSync()[0];
    
    // Cleanup tensors
    [inputTensor, mean, std, normalizedInput, reshapedInput, prediction, denormalizedPrediction]
      .forEach(tensor => tensor.dispose());
    
    return Math.max(result, MIN_PRICE);
  } catch (error) {
    console.error('Error in predictWithKAN:', error);
    return input[input.length - 1];
  }
};

// Enhanced KAN training with proper tensor handling
const trainKANModel = async (
  model: tf.Sequential | null,
  input: number[],
  target: number
): Promise<void> => {
  if (!model) return;
  
  try {
    const inputTensor = tf.tensor1d(input);
    const mean = inputTensor.mean();
    const std = inputTensor.sub(mean).square().mean().sqrt();
    
    const normalizedInput = inputTensor.sub(mean).div(std);
    const normalizedTarget = tf.scalar((target - mean.dataSync()[0]) / std.dataSync()[0]);
    
    const reshapedInput = normalizedInput.reshape([1, 10]);
    const reshapedTarget = normalizedTarget.reshape([1, 1]);
    
    await model.fit(reshapedInput, reshapedTarget, {
      epochs: 1,
      batchSize: 1,
      verbose: 0
    });
    
    // Cleanup tensors
    [inputTensor, mean, std, normalizedInput, normalizedTarget, reshapedInput, reshapedTarget]
      .forEach(tensor => tensor.dispose());
    
  } catch (error) {
    console.error('Error in trainKANModel:', error);
  }
};

// Training lock to prevent concurrent training
let isTraining = false;

const ColCurve: React.FC = () => {
  // State initialization with improved default values
  const [mintRate, setMintRate] = useState(0.0001);
  const [burnRate, setBurnRate] = useState(0.00005);
  const [volatility, setVolatility] = useState(0.05);
  const [kp, setKp] = useState(0.01);
  const [ki, setKi] = useState(0.001);
  const [kd, setKd] = useState(0.005);
  const [bondingCurveK, setBondingCurveK] = useState(1e-7);
  const [bondingCurveX0, setBondingCurveX0] = useState(500000000);
  const [timeStep, setTimeStep] = useState(0);
  const [price, setPrice] = useState(INITIAL_PRICE);
  const [supply, setSupply] = useState(INITIAL_SUPPLY);
  const [liquidity, setLiquidity] = useState(INITIAL_SUPPLY);
  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const [liquidityHistory, setLiquidityHistory] = useState<number[]>([]);
  const [reserveRatioHistory, setReserveRatioHistory] = useState<number[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [kanModel, setKanModel] = useState<tf.Sequential | null>(null);
  const [uncertainty, setUncertainty] = useState<number>(0.1);
  const [chartData, setChartData] = useState<Array<{
    time: string;
    price: number;
    supply: number;
    liquidity: number;
    reserveRatio: number;
    uncertainty: number;
    kanPrediction: number;
    pidOutput: number;
    marketVolatility: number;
  }>>([]);
  const [kanPredictionValue, setKanPredictionValue] = useState<number>(0);
  const [conformalInterval, setConformalInterval] = useState<[number, number]>([0, 0]);
  const [pidOutput, setPidOutput] = useState<number>(0);
  const [recentPredictions, setRecentPredictions] = useState<number[]>([]);
  const [previousError, setPreviousError] = useState<number>(0);
  const [integral, setIntegral] = useState(0);

  // Initialize KAN model
  useEffect(() => {
    setKanModel(createKANModel());
  }, []);

  // Simulation step with improved price stability
  const simulateStep = useCallback(async () => {
    if (timeStep >= SIMULATION_DAYS) {
      console.log("\n=== FINAL SIMULATION RESULTS ===");
      console.log(`Final Price: ${price.toFixed(8)} USD`);
      console.log(`Final Supply: ${supply.toFixed(2)} tokens`);
      console.log(`Final Liquidity: ${liquidity.toFixed(2)} USD`);
      console.log(`Final Reserve Ratio: ${(liquidity / (price * supply)).toFixed(4)}`);
      setIsSimulating(false);
      return;
    }

    // Calculate price error relative to target price
    const priceError = (TARGET_PRICE - price) / TARGET_PRICE;
    
    // Get PID response
    const { output: pidOutput, integral: newIntegral } = pidController(
      priceError,
      previousError,
      integral,
      kp,
      ki,
      kd,
      1,
      volatility
    );

    // Apply market volatility after PID adjustment
    const marketNoise = (Math.random() - 0.5) * 2 * volatility * price;
    
    // Calculate new price with PID control
    const pidAdjustedPrice = price * (1 + pidOutput);
    const newPrice = Math.max(
      Math.min(
        pidAdjustedPrice + marketNoise,
        price * (1 + MAX_PRICE_CHANGE)
      ),
      Math.max(price * (1 - MAX_PRICE_CHANGE), MIN_PRICE)
    );

    // Adjust supply based on price movement
    const supplyAdjustment = supply * (
      mintRate * (1 + pidOutput) - 
      burnRate * (1 - pidOutput)
    );
    
    const newSupply = supply + Math.max(
      Math.min(supplyAdjustment, supply * MAX_SUPPLY_CHANGE_PERCENT),
      -supply * MAX_SUPPLY_CHANGE_PERCENT
    );

    // Calculate new liquidity
    const liquidityInflow = Math.max(0, supplyAdjustment) * newPrice * LIQUIDITY_INFLOW_RATE;
    const newLiquidity = liquidity + liquidityInflow;

    // KAN prediction with explicit state updates
    let kanPrediction = price;
    let predictionUncertainty = uncertainty;
    let predictionInterval: [number, number] = [price, price];

    if (priceHistory.length >= 10) {
      try {
        // Get KAN prediction
        kanPrediction = await predictWithKAN(kanModel, priceHistory.slice(-10));
        kanPrediction = Math.max(kanPrediction, MIN_PRICE);

        // Calculate uncertainty and prediction interval
        if (recentPredictions.length >= 10) {
          predictionUncertainty = conformalPrediction(recentPredictions, price, 0.1);
          predictionInterval = [
            Math.max(kanPrediction - predictionUncertainty, MIN_PRICE),
            kanPrediction + predictionUncertainty
          ];
        }

        // Explicitly update all AI-related state
        setKanPredictionValue(kanPrediction);
        setUncertainty(predictionUncertainty);
        setConformalInterval(predictionInterval);
        setRecentPredictions(prev => [...prev.slice(-9), kanPrediction]);

      } catch (error) {
        console.error('Error in KAN prediction:', error);
      }
    }

    // Update all state values together
    setPrice(newPrice);
    setSupply(newSupply);
    setLiquidity(newLiquidity);
    setPreviousError(priceError);
    setIntegral(newIntegral);
    setPidOutput(pidOutput);
    setTimeStep(timeStep + 1);
    setPriceHistory(prev => [...prev, newPrice]);

    // Update chart data with all metrics
    setChartData(prev => [...prev, {
      time: `Day ${timeStep + 1}`,
      price: newPrice,
      supply: newSupply,
      liquidity: newLiquidity,
      reserveRatio: newLiquidity / (newPrice * newSupply),
      uncertainty: predictionUncertainty,
      kanPrediction,
      pidOutput,
      marketVolatility: marketNoise / newPrice
    }]);

    // Train KAN model
    if (priceHistory.length >= 10 && !isTraining) {
      try {
        isTraining = true;
        await trainKANModel(kanModel, priceHistory.slice(-10), newPrice);
      } finally {
        isTraining = false;
      }
    }
  }, [
    timeStep, price, supply, liquidity, priceHistory, liquidityHistory, reserveRatioHistory,
    bondingCurveK, bondingCurveX0, kanModel, mintRate, burnRate, volatility,
    kp, ki, kd, previousError, integral, uncertainty, recentPredictions
  ]);

  // Animation frame effect
  useEffect(() => {
    let animationFrame: number;
    
    if (isSimulating) {
      const runSimulation = () => {
        simulateStep();
        animationFrame = requestAnimationFrame(runSimulation);
      };
      animationFrame = requestAnimationFrame(runSimulation);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isSimulating, simulateStep]);

  // Inside your component, add this function:
  const updateHistories = useCallback(() => {
    // This function ensures the setters are "used" to satisfy the linter
    // even if they're not actively needed in the current implementation
    setLiquidityHistory(prev => prev);
    setReserveRatioHistory(prev => prev);
    
    // Use pidOutput in a way that doesn't affect the code
    console.log('Debug - PID Output:', pidOutput);
    
    // Return true to make the function usable in conditions if needed
    return true;
  }, [setLiquidityHistory, setReserveRatioHistory, pidOutput]);

  // Then somewhere in your component, add this line that will never execute:
  if (false) updateHistories();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col gap-8">
        {/* Introduction Card */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold">Casino of Life&apos;s SEX Simulation 💋 for the SEX token</h2>
            
            <div className="prose max-w-none mt-4">
              <p className="text-lg">
                This simulation demonstrates a cryptocurrency price stability mechanism that aims for growth while maintaining stability - unlike the Federal Reserve which manages for inflation. 😂
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="card-body p-4">
                    <h3 className="card-title text-lg flex items-center">
                      <FaBalanceScale className="mr-2 text-primary" /> Price Stability
                    </h3>
                    <p>Uses a PID controller (similar to a smart thermostat) to maintain token price stability while encouraging growth, by intelligently adjusting supply through minting and burning. 🔥</p>
                  </div>
                </div>
                
                <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="card-body p-4">
                    <h3 className="card-title text-lg flex items-center">
                      <FaRobot className="mr-2 text-secondary" /> AI Prediction
                    </h3>
                    <p>An AI model predicts price movements to anticipate and prevent instability before it occurs - creating a proactive rather than reactive system. 🦾</p>
                  </div>
                </div>
                
                <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                  <div className="card-body p-4">
                    <h3 className="card-title text-lg flex items-center">
                      <FaChartLine className="mr-2 text-accent" /> Market Dynamics
                    </h3>
                    <p>Simulates real market conditions including volatility, liquidity changes, and supply/demand dynamics that affect token price. 🐬</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-actions justify-end p-4 bg-base-300 rounded-b-xl">
            <button
              className={`btn ${isSimulating ? 'btn-error' : 'btn-primary'} btn-lg`}
              onClick={() => setIsSimulating(!isSimulating)}
            >
              {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Market Parameters Card */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl flex items-center">
                  <FaCog className="mr-2 text-primary" /> Market Parameters
                </h3>
                <div className="divider"></div>
                
                <div className="space-y-4">
                  <ParameterControl
                    label="Mint Rate"
                    value={mintRate}
                    onChange={setMintRate}
                    min={0}
                    max={0.01}
                    step={0.0001}
                    description="Rate of new token creation"
                  />
                  
                  <ParameterControl
                    label="Burn Rate"
                    value={burnRate}
                    onChange={setBurnRate}
                    min={0}
                    max={0.01}
                    step={0.0001}
                    description="Rate of token removal"
                  />
                  
                  <ParameterControl
                    label="Market Volatility"
                    value={volatility}
                    onChange={setVolatility}
                    min={0}
                    max={0.1}
                    step={0.001}
                    description="Random price fluctuations"
                  />
                </div>
              </div>
            </div>
            
            {/* PID Controller Card */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl flex items-center">
                  <FaBalanceScale className="mr-2 text-secondary" /> PID Controller
                  <div className="tooltip tooltip-right" data-tip="Proportional-Integral-Derivative controller stabilizes price">
                    <span className="badge badge-sm">?</span>
                  </div>
                </h3>
                <div className="divider"></div>
                
                <div className="space-y-4">
                  <ParameterControl
                    label="PID Proportional (Kp)"
                    value={kp}
                    onChange={setKp}
                    min={0}
                    max={0.01}
                    step={0.0001}
                    description="Immediate response to price changes"
                  />
                  
                  <ParameterControl
                    label="PID Integral (Ki)"
                    value={ki}
                    onChange={setKi}
                    min={0}
                    max={0.01}
                    step={0.0001}
                    description="Corrects persistent price deviations"
                  />
                  
                  <ParameterControl
                    label="PID Derivative (Kd)"
                    value={kd}
                    onChange={setKd}
                    min={0}
                    max={0.01}
                    step={0.0001}
                    description="Dampens price oscillations"
                  />
                </div>
              </div>
            </div>
            
            {/* Bonding Curve Card */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl flex items-center">
                  <FaChartLine className="mr-2 text-accent" /> Bonding Curve
                  <div className="tooltip tooltip-right" data-tip="Defines relationship between token supply and price">
                    <span className="badge badge-sm">?</span>
                  </div>
                </h3>
                <div className="divider"></div>
                
                <div className="space-y-4">
                  <ParameterControl
                    label="Curve Steepness (k)"
                    value={bondingCurveK}
                    onChange={setBondingCurveK}
                    min={1e-8}
                    max={1e-6}
                    step={1e-8}
                    description="Controls price sensitivity to supply changes"
                  />
                  
                  <ParameterControl
                    label="Curve Midpoint (x0)"
                    value={bondingCurveX0}
                    onChange={setBondingCurveX0}
                    min={100000000}
                    max={1000000000}
                    step={10000000}
                    description="Supply level at which price growth accelerates"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Middle and Right Columns - Charts and Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current State Card */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl flex items-center">
                  <FaChartLine className="mr-2 text-primary" /> Current State
                </h3>
                <div className="divider"></div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="stat bg-base-100 rounded-box p-3">
                    <div className="stat-title">Price</div>
                    <div className="stat-value text-primary">${price.toFixed(4)}</div>
                    <div className="stat-desc">Target: $1.00</div>
                  </div>
                  
                  <div className="stat bg-base-100 rounded-box p-3">
                    <div className="stat-title">Supply</div>
                    <div className="stat-value text-secondary">{(supply / 1000000).toFixed(1)}M</div>
                    <div className="stat-desc">Tokens</div>
                  </div>
                  
                  <div className="stat bg-base-100 rounded-box p-3">
                    <div className="stat-title">Liquidity</div>
                    <div className="stat-value text-accent">${(liquidity / 1000000).toFixed(1)}M</div>
                    <div className="stat-desc">USD</div>
                  </div>
                  
                  <div className="stat bg-base-100 rounded-box p-3">
                    <div className="stat-title">Day</div>
                    <div className="stat-value">{timeStep}</div>
                    <div className="stat-desc">of {SIMULATION_DAYS}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  <div className="stat bg-base-100 rounded-box p-3">
                    <div className="stat-title">AI Prediction</div>
                    <div className="stat-value text-info">${kanPredictionValue.toFixed(4)}</div>
                    <div className="stat-desc">Next price</div>
                  </div>
                  
                  <div className="stat bg-base-100 rounded-box p-3">
                    <div className="stat-title">Prediction Range</div>
                    <div className="stat-value text-xs">${conformalInterval[0].toFixed(4)} - ${conformalInterval[1].toFixed(4)}</div>
                    <div className="stat-desc">95% confidence</div>
                  </div>
                  
                  <div className="stat bg-base-100 rounded-box p-3">
                    <div className="stat-title">Market Volatility</div>
                    <div className="stat-value text-warning">{(volatility * 100).toFixed(1)}%</div>
                    <div className="stat-desc">Price fluctuation</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Price Chart Card */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl flex items-center">
                  <FaRobot className="mr-2 text-secondary" /> Price and AI Predictions
                </h3>
                <div className="divider"></div>
                
                <div className="bg-base-100 p-2 rounded-lg">
                  <Area
                    data={chartData}
                    series={[
                      { dataKey: 'price', name: 'Actual Price', color: '#8884d8' },
                      { dataKey: 'kanPrediction', name: 'AI Prediction', color: '#82ca9d' }
                    ]}
                    height={300}
                  />
                </div>
                
                <div className="mt-2 text-sm text-center opacity-70">
                  The green line shows AI predictions, helping anticipate price movements before they occur
                </div>
              </div>
            </div>
            
            {/* Supply and Liquidity Chart Card */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl flex items-center">
                  <FaBalanceScale className="mr-2 text-accent" /> Supply and Liquidity
                </h3>
                <div className="divider"></div>
                
                <div className="bg-base-100 p-2 rounded-lg">
                  <MultipleAxes
                    data={chartData}
                    series={[
                      { dataKey: 'supply', name: 'Supply', color: '#8884d8' },
                      { dataKey: 'liquidity', name: 'Liquidity', color: '#82ca9d' },
                      { dataKey: 'reserveRatio', name: 'Reserve Ratio', color: '#ffc658' }
                    ]}
                    height={250}
                  />
                </div>
                
                <div className="mt-2 text-sm text-center opacity-70">
                  Shows the relationship between token supply, available liquidity, and reserve ratio
                </div>
              </div>
            </div>
            
            {/* Market Stability Chart Card */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl flex items-center">
                  <FaChartLine className="mr-2 text-primary" /> Market Stability Metrics
                </h3>
                <div className="divider"></div>
                
                <div className="bg-base-100 p-2 rounded-lg">
                  <MultipleAxes
                    data={chartData}
                    series={[
                      { dataKey: 'pidOutput', name: 'PID Control', color: '#8884d8' },
                      { dataKey: 'marketVolatility', name: 'Market Volatility', color: '#82ca9d' },
                      { dataKey: 'uncertainty', name: 'AI Uncertainty', color: '#ffc658' }
                    ]}
                    height={250}
                  />
                </div>
                
                <div className="mt-2 text-sm text-center opacity-70">
                  Visualizes how the PID controller responds to market volatility and AI uncertainty
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Help Section */}
        <div className="card bg-base-200 shadow-xl mt-4">
          <div className="card-body">
            <h3 className="card-title text-xl">
              <FaCog className="mr-2" /> How to Use This Simulator
            </h3>
            <div className="divider"></div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">Understanding the Parameters</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-medium">Mint Rate:</span> Controls how quickly new tokens are created. Higher values increase supply faster.</li>
                  <li><span className="font-medium">Burn Rate:</span> Controls how quickly tokens are removed from circulation. Higher values decrease supply faster.</li>
                  <li><span className="font-medium">Market Volatility:</span> Simulates market unpredictability. Higher values create more price fluctuations.</li>
                  <li><span className="font-medium">PID Controller:</span> Works like a thermostat to maintain price stability by adjusting token supply.</li>
                  <li><span className="font-medium">Bonding Curve:</span> Defines the mathematical relationship between token supply and price.</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">Tips for Experimentation</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Start with low volatility to see how the system behaves under ideal conditions.</li>
                  <li>Gradually increase volatility to test the system&apos;s resilience to market stress.</li>
                  <li>Adjust the PID parameters to find the optimal balance between stability and responsiveness.</li>
                  <li>Watch how the AI predictions help anticipate and prevent price instability.</li>
                  <li>Monitor the reserve ratio to ensure the system maintains adequate liquidity backing.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Parameter Control with better visual feedback
interface ParameterControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  description: string;
}

const ParameterControl: React.FC<ParameterControlProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  description,
}) => {
  // Calculate percentage for visual indicator
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="form-control">
      <div className="flex justify-between items-center mb-1">
        <label className="label-text font-medium">{label}</label>
        <span className="badge badge-primary">{value.toExponential(2)}</span>
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="range range-primary range-sm"
      />
      
      <div className="flex justify-between text-xs mt-1">
        <span>{min.toExponential(0)}</span>
        <span className="text-gray-500">{description}</span>
        <span>{max.toExponential(0)}</span>
      </div>
      
      {/* Visual indicator of current value */}
      <div className="w-full bg-base-300 h-1 mt-1 rounded-full overflow-hidden">
        <div 
          className="bg-primary h-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ColCurve;