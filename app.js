// Native
const { stringify } = require('querystring')

// Packages
const Koa = require('koa')
const Router = require('koa-router')
const Next = require('next')
const uuid = require('uuid/v4')

// Ours
const api = require('./api')
const { loginRequired } = require('./lib/auth')
const { dev, port } = require('./config/env')

const app = Next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
	const server = new Koa()
	const router = new Router()

	// Server keys
	server.keys = [uuid()]

	// API routes
	router.use(api.routes())
	router.use(api.allowedMethods())

	// New page requires login
	router.get('/new', loginRequired, async ctx => {
		if (!ctx.state.user) {
			ctx.redirect(`/login/?next=${stringify(ctx.href)}`)
		}
		ctx.status = 200
		await app.render(ctx.req, ctx.res, '/new', ctx.query)
		ctx.respond = false
	})

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
