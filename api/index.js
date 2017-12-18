// Packages
const Router = require('koa-router')

// Ours
const passport = require('./auth')
const github = require('../lib/github')

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
	ctx.body = JSON.stringify(ctx.state.user)
})

//=============================================================================
// > Form endpoint
//=============================================================================

api.get('/api/:owner/:name/submit.yml', async ctx => {
	ctx.assert(ctx.isAuthenticated(), 401, 'Unauthorized!')
	ctx.type = 'text/plain'

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
	try {
		const res = await github.getForm(owner, name, default_branch)
		if (res.ok) {
			ctx.body = await res.text()
		} else {
			ctx.status = 404
		}
	} catch (err) {
		ctx.status = 500
	}
})

module.exports = api
