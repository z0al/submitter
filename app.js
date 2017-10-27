// Packages
const Koa = require('koa')
const Router = require('koa-router')
const Next = require('next')

// Ours
const api = require('./api')
const { dev, port } = require('./config/env')

const app = Next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  // API routes
  router.use(api.routes())
  router.use(api.allowedMethods())

  // Other routes
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
