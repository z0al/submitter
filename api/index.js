// Packages
const Router = require('koa-router')

// Ours
const { buildAuthURL, exchangeCode, loginRequired } = require('../lib/auth')

// Globals
const api = new Router()

//=============================================================================
// > Authentication
//=============================================================================

api.get('/login', async ctx => {
	// Initiates the Authorization Code Grant flow and redirects the browser to
	// Auth0 authorization endpoint, so the user can authenticate using GitHub.
	if (ctx.query.next) {
		ctx.cookies.set('next', ctx.query.next)
	}
	ctx.redirect(buildAuthURL(ctx))
})

api.get('/login/callback', async ctx => {
	if (ctx.query.code) {
		// Exchange code
		const token = await exchangeCode(ctx)
		ctx.cookies.set('token', token, { signed: true })
		const next = ctx.cookies.get('next') || '/'

		// Redirect the user back
		ctx.redirect(next)
	} else {
		ctx.redirect('/login')
	}
})

api.get('/logout', async ctx => {
	// NOTE: This won't revoke the JWT token, however, it has a short lifetime,
	// and will no longer be useful after it expired!
	ctx.cookies.set('token', null, { signed: true })
	// Just in case
	ctx.cookies.set('next', null, { signed: true })
	// Redirect the user back to the index page
	ctx.redirect('/')
})

//=============================================================================
// > User info
//=============================================================================

api.get('/userinfo', loginRequired, async ctx => {
	ctx.assert(ctx.state.user, 401, 'Unauthorized!')
	ctx.type = 'application/json'
	ctx.body = JSON.stringify(ctx.state.user)
})

module.exports = api
