const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const path = require('path')

// Use environment variables with fallbacks
// Force production mode for cPanel
const dev = false
const hostname = process.env.HOST || 'localhost'
// Let cPanel assign the port automatically - this is crucial
// for shared hosting environments
const port = process.env.PORT || 0

// Set memory limits - increase from default to prevent resource issues
process.env.NODE_OPTIONS = process.env.NODE_OPTIONS || '--max-old-space-size=4096'

// Initialize the Next.js app with minimal configuration
const app = next({
  dev,
  dir: __dirname,
  conf: {
    distDir: '.next',
    configOrigin: 'next.config.js',
    useFileSystemPublicRoutes: true,
    generateEtags: true,
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
    target: 'server',
    poweredByHeader: false,
    compress: true
  }
})

const handle = app.getRequestHandler()

// Start the server with minimal error handling
app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      // Set CORS headers for all responses
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
      
      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        res.writeHead(200)
        res.end()
        return
      }
      
      // Handle the request with Next.js
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('Internal server error')
    }
  })
  
  // Listen on any available port if not specified
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on port ${server.address().port}`)
  })
})