// Packages
const Router = require('koa-router')

// Ours
const opt = require('../config/options')
const { buildAuthURL, exchangeCode } = require('../lib/auth')

// Globals
const api = new Router()

//---------------------------------------------------------------------
// > Authentication
//---------------------------------------------------------------------

api.get('/login', async ctx => {
	// Initiates the Authorization Code Grant flow and redirects the browser to
	// Auth0 authorization endpoint, so the user can authenticate using GitHub.
	ctx.redirect(buildAuthURL(ctx))
})

api.get('/login/callback', async ctx => {
	if (ctx.query.code) {
		// Exchange code
		const token = await exchangeCode(ctx)
		ctx.cookies.set('token', token, opt.cookies)

		// Redirect the user back to the home
		ctx.redirect('/')
	} else {
		ctx.redirect('/login')
	}
})

api.get('/logout', async ctx => {
	// NOTE: This won't revoke the JWT token, however, it has a short lifetime,
	// and will no longer be useful after it expired!
	ctx.cookies.set('token', null, opt.cookies)
	// Redirect the user back to the home
	ctx.redirect('/')
})

module.exports = api
