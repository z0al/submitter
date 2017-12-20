// Packages
const Router = require('koa-router')

// Ours
const passport = require('./auth')
const github = require('../lib/github')
const validateForm = require('../lib/schema')

// Globals
const api = new Router()

//=============================================================================
// > Authentication
//=============================================================================

api.get(
	'/login',
	passport.authenticate('github', { scope: ['read:user', 'public_repo'] })
)

api.get(
	'/login/callback',
	passport.authenticate('github', {
		successReturnToOrRedirect: '/',
		failureRedirect: '/login'
	})
)

api.get('/logout', async ctx => {
	ctx.logout()
	ctx.redirect('/')
})

//=============================================================================
// > User info
//=============================================================================

api.get('/api/userinfo', async ctx => {
	ctx.assert(ctx.isAuthenticated(), 401, 'Unauthorized!')
	ctx.type = 'application/json'
	const { login, avatar_url, html_url } = ctx.state.user
	ctx.body = JSON.stringify({ login, avatar_url, html_url })
})

//=============================================================================
// > Form endpoint
//=============================================================================

api.get('/api/:owner/:name/submit.json', async ctx => {
	ctx.assert(ctx.isAuthenticated(), 401, 'Unauthorized!')
	ctx.type = 'application/json'

	// OAuth2 token
	const { token } = ctx.state.user
	const { owner, name } = ctx.params
	const repo = await github.getRepo(token, owner, name)

	if (!repo) {
		ctx.status = 404
		return
	}

	// Extract necessary details
	const { full_name, default_branch } = repo

	// Get repository Form
	const res = await github.getForm(owner, name, default_branch)
	if (res.ok) {
		const text = await res.text()
		try {
			ctx.body = JSON.stringify(await validateForm(text))
		} catch (err) {
			ctx.status = 422
		}
	} else {
		ctx.status = 404
	}
})

//=============================================================================
// > Issues endpoint
//=============================================================================
api.post('/api/:owner/:name/submit', async ctx => {
	ctx.assert(ctx.isAuthenticated(), 401, 'Unauthorized!')

	if (ctx.is('application/json')) {
		// Issue details
		const { title, body } = ctx.request.body

		// OAuth2 token
		const { token } = ctx.state.user
		const { owner, name } = ctx.params

		const { id, html_url } = await github.createIssue(
			token,
			owner,
			name,
			title,
			body
		)

		// Response
		ctx.type = 'application/json'
		ctx.body = JSON.stringify({ id, html_url })
	} else {
		ctx.throw(415, 'Unsupported media type!')
	}
})

module.exports = api
