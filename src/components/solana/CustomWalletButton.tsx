'use client';

import React, { useState, useCallback } from 'react';
import { WalletName } from '@solana/wallet-adapter-base';
import { Wallet, useWallet } from '@solana/wallet-adapter-react';
import { Dialog } from '@headlessui/react';
import { FaWallet, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';

const CustomWalletButton: React.FC = () => {
  const [walletModalConfig, setWalletModalConfig] = useState<Readonly<{
    onSelectWallet(walletName: WalletName): void;
    wallets: Wallet[];
  }> | null>(null);

  const { publicKey, disconnect, wallet, wallets, select, connecting, disconnecting, connected } = useWallet();

  // Since useWalletMultiButton might not be available, let's implement the logic ourselves
  const buttonState = connected ? 'connected' : 
                     connecting ? 'connecting' : 
                     disconnecting ? 'disconnecting' : 
                     wallet ? 'has-wallet' : 'no-wallet';

  const onConnect = useCallback(() => {
    if (wallet) {
      wallet.adapter.connect().catch(() => {});
    }
  }, [wallet]);

  const onDisconnect = useCallback(() => {
    if (connected) {
      disconnect().catch(() => {});
    }
  }, [connected, disconnect]);

  const onSelectWallet = useCallback(() => {
    setWalletModalConfig({
      wallets,
      onSelectWallet: (walletName) => {
        select(walletName);
      }
    });
  }, [select, wallets]);

  const closeModal = useCallback(() => {
    setWalletModalConfig(null);
  }, []);

  // Format public key for display
  const formattedPublicKey = publicKey ? 
    `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}` : 
    '';

  // Determine button text and icon based on state
  let buttonText;
  let buttonIcon;
  let buttonClass = "btn";

  switch (buttonState) {
    case 'connected':
      buttonText = formattedPublicKey;
      buttonIcon = <FaCheck className="mr-2" />;
      buttonClass = "btn btn-primary";
      break;
    case 'connecting':
      buttonText = 'Connecting';
      buttonIcon = <FaSpinner className="mr-2 animate-spin" />;
      buttonClass = "btn btn-primary btn-disabled";
      break;
    case 'disconnecting':
      buttonText = 'Disconnecting';
      buttonIcon = <FaSpinner className="mr-2 animate-spin" />;
      buttonClass = "btn btn-primary btn-disabled";
      break;
    case 'has-wallet':
      buttonText = 'Connect';
      buttonIcon = <FaWallet className="mr-2" />;
      buttonClass = "btn btn-primary";
      break;
    case 'no-wallet':
      buttonText = 'Connect Wallet';
      buttonIcon = <FaWallet className="mr-2" />;
      buttonClass = "btn btn-primary";
      break;
  }

  const handleClick = useCallback(() => {
    switch (buttonState) {
      case 'connected':
        onDisconnect();
        break;
      case 'connecting':
      case 'disconnecting':
        // Do nothing while in transition states
        break;
      case 'has-wallet':
        onConnect();
        break;
      case 'no-wallet':
        onSelectWallet();
        break;
    }
  }, [buttonState, onConnect, onDisconnect, onSelectWallet]);

  return (
    <>
      <button
        className={buttonClass}
        disabled={buttonState === 'connecting' || buttonState === 'disconnecting'}
        onClick={handleClick}
      >
        {buttonIcon}
        {buttonText}
      </button>

      {/* Wallet Selection Modal */}
      {walletModalConfig && (
        <Dialog
          open={walletModalConfig !== null}
          onClose={closeModal}
          className="relative z-50"
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          {/* Full-screen container for centering */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="card bg-base-200 shadow-xl w-full max-w-sm">
              <div className="card-body">
                <Dialog.Title className="card-title flex justify-between">
                  <span>Select Wallet</span>
                  <button onClick={closeModal} className="btn btn-sm btn-circle">
                    <FaTimes />
                  </button>
                </Dialog.Title>

                <div className="py-4 space-y-2">
                  {walletModalConfig.wallets.map((wallet) => (
                    <button
                      key={wallet.adapter.name}
                      onClick={() => {
                        walletModalConfig.onSelectWallet(wallet.adapter.name);
                        closeModal();
                      }}
                      className="btn btn-outline w-full justify-start"
                    >
                      {wallet.adapter.icon && (
                        <img 
                          src={wallet.adapter.icon} 
                          alt={`${wallet.adapter.name} icon`}
                          className="w-6 h-6 mr-2"
                        />
                      )}
                      {wallet.adapter.name}
                    </button>
                  ))}
                </div>

                <div className="card-actions justify-end mt-4">
                  <button onClick={closeModal} className="btn btn-ghost">
                    Cancel
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default CustomWalletButton; 