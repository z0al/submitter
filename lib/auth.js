// Native
const { stringify } = require('querystring')

// Packages
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
	return await request(options)['id_token']
}

module.exports = { buildAuthURL, exchangeCode }
