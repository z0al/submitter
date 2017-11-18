// Packages
const uuid = require('uuid/v4')
const env = require('dotenv')

// Load .env (if any)
env.config()

// GitHub credentials
const clientID = process.env.GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET

// Others
const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000
const secret = dev ? '123456789' : uuid()

module.exports = { clientID, clientSecret, dev, port, secret }
