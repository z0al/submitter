// Packages
const Koa = require('koa')
const Router = require('koa-router')
const Session = require('koa-session')
const Next = require('next')

// Ours
const api = require('./api')
const { dev, port, secret } = require('./config/env')
const passport = require('./lib/auth')

const next = Next({ dev })
const handle = next.getRequestHandler()

next.prepare().then(() => {
	const app = new Koa()
	const router = new Router()

	// Keys
	app.keys = [secret]

	// Session
	app.use(Session({ key: 'session' }, app))

	// Passport
	app.use(passport.initialize())
	app.use(passport.session())

	// API routes
	router.use(api.routes())
	router.use(api.allowedMethods())

	// New page
	router.get('/form', async ctx => {
		if (!ctx.isAuthenticated()) {
			// Will be used later Passport
			ctx.session.returnTo = ctx.href
			ctx.redirect('/login')
		} else {
			ctx.status = 200
			await next.render(ctx.req, ctx.res, '/form', ctx.query)
			ctx.respond = false
		}
	})

	// Other routes
	router.get('*', async ctx => {
		await handle(ctx.req, ctx.res)
		ctx.respond = false
	})

	app.use(router.routes())

	// Start app
	app.listen(port, err => {
		if (err) throw err

		console.log(`> Ready on :${port}`)
	})
})
