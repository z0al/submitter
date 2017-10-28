// Native
const { stringify } = require('querystring')

// Packages
const Router = require('koa-router')
const request = require('request-promise-native')

// Ours
const { client_id, client_secret } = require('../config/env')
const opt = require('../config/options')

// Globals
const api = new Router()

//---------------------------------------------------------------------
// > Authentication
//---------------------------------------------------------------------

api.get('/login', async ctx => {
	// Initiates the Authorization Code Grant flow and redirects the browser to
	// Auth0 authorization endpoint, so the user can authenticate using GitHub.
	ctx.redirect(
		`https://submitter.auth0.com/authorize?${stringify({
			client_id,
			connection: 'github', // Don't show login widget, redirect to GitHub
			redirect_uri: `${ctx.origin}/login/callback`,
			response_type: 'code',
			scope: 'openid profile'
		})}`
	)
})

api.get('/login/callback', async ctx => {
	if (ctx.query.code) {
		var options = {
			method: 'POST',
			url: 'https://submitter.auth0.com/oauth/token',
			headers: { 'content-type': 'application/json' },
			body: {
				client_id,
				client_secret,
				code: ctx.query.code,
				grant_type: 'authorization_code',
				redirect_uri: `${ctx.origin}/login/callback`
			},
			json: true
		}
		// Exchange code
		const tokens = await request(options)
		ctx.cookies.set('token', tokens['id_token'], opt.cookies)

		// Redirect the user back to the home
		ctx.redirect('/')
	} else {
		ctx.redirect('/login')
	}
})

api.get('/logout', async ctx => {
	// TODO: Write logout logic here
})

module.exports = api
