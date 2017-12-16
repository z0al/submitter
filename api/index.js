// Packages
const Router = require('koa-router')

// Ours
const passport = require('../lib/auth')
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

api.get('/userinfo', async ctx => {
	ctx.assert(ctx.isAuthenticated(), 401, 'Unauthorized!')
	ctx.type = 'application/json'
	ctx.body = JSON.stringify(ctx.state.user)
})

//=============================================================================
// > Form endpoint
//=============================================================================

api.post('/form', async ctx => {
	ctx.assert(ctx.isAuthenticated(), 401, 'Unauthorized!')
	ctx.type = 'application/json'

	// OAuth2 token
	const { token } = ctx.state.user
	const query = ctx.query.repo

	const repo = await github.getRepo(ctx.state.user.token, query)

	// The repo param either invalid or the repository isn't found
	// Return 404
	if (!repo) {
		ctx.status = 404
		return
	}

	// Extract necessary details
	const { full_name, archived, default_branch, has_issues } = repo

	// Will we be able to create a new issue?
	const possible = has_issues && !archived

	// Get repository Form
	const form = await github.getForm(full_name, default_branch)

	ctx.body = JSON.stringify({ full_name, possible, form })
})

module.exports = api
