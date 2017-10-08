// Native
const { parse } = require('url')

// Packages
const next = require('next')
const micro = require('micro')
const match = require('micro-route/match')

// Ours
const { dev, port } = require('./config')

const app = next({ dev })
const handle = app.getRequestHandler()

const server = micro(async (req, res) => {
  const url = parse(req.url, true)
  const { query } = url

  return handle(req, res, url)
})

app.prepare().then(() => {
  server.listen(port, err => {
    if (err) throw err

    console.log(`> Ready on http://localhost:${port}`)
  })
})
