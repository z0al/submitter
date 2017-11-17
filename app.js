// Packages
const Koa = require('koa')
const Router = require('koa-router')
const Session = require('koa-session')
const Next = require('next')
const uuid = require('uuid/v4')

// Ours
const api = require('./api')
const { dev, port } = require('./config/env')
const passport = require('./lib/auth')

const app = Next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
	const server = new Koa()
	const router = new Router()

	// Keys
	server.keys = [uuid()]

	// Session
	server.use(Session({ key: 'session', rolling: true }, server))

	// Passport
	server.use(passport.initialize())
	server.use(passport.session())

	// API routes
	router.use(api.routes())
	router.use(api.allowedMethods())

	// New page
	router.get('/new', async ctx => {
		if (!ctx.isAuthenticated()) {
			// NOTE: enabling this throws:
			//
			// 		Error: Can't set headers after they are sent.
			//
			// ctx.session.returnTo = ctx.href
			ctx.redirect('/login')
		} else {
			await app.render(ctx.req, ctx.res, '/new', ctx.query)
			ctx.respond = false
		}
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

		console.log(`> Ready on :${port}`)
	})
})
