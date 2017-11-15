// Packages
const unfetch = require('isomorphic-unfetch')

// Ours
import { host } from '../config/client'

/**
 * A wrapper around unfetch to inject cookies header and resolve relative URLs
 * when making server-side API calls due to SSR. It
 * 
 * @param {*} req 
 * @param {RequestInfo} url 
 * @param {RequestInit} options 
 */
const fetch = async (req, url, options = {}) => {
	// Relative URL?
	if (url.startsWith('/')) {
		url = host + url
	}

	// HTTP headers
	options.headers = options.headers || {}

	// SSR? inject cookies
	if (req) {
		options.headers['Cookie'] = req.headers['cookie']
	}

	// By default, fetch won't send or receive any cookies from the server
	options.credentials = 'same-origin'

	return unfetch(url, options)
}

module.exports = fetch
