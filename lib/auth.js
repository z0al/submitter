// Native
const { stringify } = require('querystring')

// Packages
const jwks = require('jwks-rsa')
const jwt = require('koa-jwt')
const request = require('request-promise-native')

// Ours
const { client_id, client_secret } = require('../config/env')

// Globals
const baseURL = 'https://submitter.auth0.com'

/**
 * Builds authorization URL to initiate Authorization Code grant flow
 * 
 * @param {Router.IRouterContext} ctx 
 */
const buildAuthURL = ctx => {
	return `${baseURL}/authorize?${stringify({
		client_id,
		connection: 'github', // Don't show login widget, redirect to GitHub
		redirect_uri: `${ctx.origin}/login/callback`,
		response_type: 'code',
		scope: 'openid profile'
	})}`
}

/**
 * Exchanges authorization code with JWT (id_token)
 * 
 * @param {Router.IRouterContext} ctx 
 * @returns id_token
 */
const exchangeCode = async ctx => {
	var options = {
		method: 'POST',
		url: `${baseURL}/oauth/token`,
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
	// Send request
	const tokens = await request(options)
	return tokens['id_token']
}

/**
 * JWT Verfication Middleware
 */
const loginRequired = jwt({
	audience: client_id,
	cookie: 'token',
	issuer: `${baseURL}/`,
	passthrough: true,
	secret: jwks.koaJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `${baseURL}/.well-known/jwks.json`
	}),
	algorithms: ['RS256']
})

module.exports = { buildAuthURL, exchangeCode, loginRequired }
