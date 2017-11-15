// Load .env (if any)
require('dotenv').config()

// Auth0 credentials
const client_id = process.env.AUTH0_CLIENT_ID
const client_secret = process.env.AUTH0_CLIENT_SECRET

// Others
const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000

module.exports = { client_id, client_secret, dev, port }
