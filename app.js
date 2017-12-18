// Packages
const Koa = require('koa')
const Router = require('koa-router')
const Session = require('koa-session')
const Next = require('next')

// Ours
const api = require('./api')
const { dev, port, secret } = require('./config/env')
const passport = require('./lib/auth')
const github = require('./lib/github')

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

	// Submission page
	router.get('/to/:owner/:repo', async ctx => {
		if (!ctx.isAuthenticated()) {
			// Will be used later by Passport
			ctx.session.returnTo = ctx.href
			ctx.redirect('/login')
		} else {
			// GitHub token
			const { token } = ctx.state.user
			const slug = `${ctx.params.owner}/${ctx.params.repo}`

			const repo = await github.getRepo(token, slug)

			if (!repo) {
				ctx.status = 404
				ctx.body = "We couldn't find the repository you're looking for!"
				return
			}

			// Extract necessary details
			const { archived, has_issues } = repo

			// Will we be able to create a new issue?
			if (!has_issues || archived) {
				ctx.status = 412
				ctx.body = 'The repository is either archived or issues are disabled!'
				return
			}

			await next.render(ctx.req, ctx.res, '/_form', ctx.query)
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
