// Native
const { stringify } = require('querystring')

// Packages
const Router = require('koa-router')

// Ours
const { client_id } = require('../config/env')

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
			response_type: 'code'
		})}`
	)
})

api.get('/login/callback', async ctx => {
	// TODO: Write login callback logic here
})

api.get('/logout', async ctx => {
	// TODO: Write logout logic here
})

module.exports = api
