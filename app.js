// Native
const { parse } = require('url')

// Packages
const next = require('next')
const Koa = require('koa')
const Router = require('koa-router')

// Ours
const { dev, port } = require('./config')

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  // Routes
  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(router.routes())

  // Start server
  server.listen(port, err => {
    if (err) throw err

    console.log(`> Ready on http://localhost:${port}`)
  })
})
