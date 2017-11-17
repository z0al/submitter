// Load .env (if any)
require('dotenv').config()

// GitHub credentials
const clientID = process.env.GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET

// Others
const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000

module.exports = { clientID, clientSecret, dev, port }
