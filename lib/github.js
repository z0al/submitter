// Packages
const fetch = require('isomorphic-unfetch')

/**
 * Try to fetch repository details using GitHub API
 *
 * @param {string} token
 * @param {string} owner
 * @param {string} name
 */
async function getRepo(token, owner, name) {
	// Get /repos/:owner/:name
	const res = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
		headers: { Authorization: `token ${token}` }
	})

	if (res.ok) {
		return res.json()
	}
	return null
}

/**
 * Try to fetch `submit.yml` file from the given repository.
 *
 * @param {string} owner
 * @param {string} name
 * @param {string} branch
 */
async function getForm(owner, name, branch) {
	const path = `${owner}/${name}/${branch}/.github/submit.yml`
	return fetch(`https://raw.githubusercontent.com/${path}`)
}

/**
 * Create an issue against the given repository.
 *
 * @param {string} token
 * @param {string} owner
 * @param {string} name
 * @param {string} title
 * @param {string} body
 */
async function createIssue(token, owner, name, title, body) {
	const url = `https://api.github.com/repos/${owner}/${name}/issues`
	return fetch(url, {
		method: 'POST',
		headers: {
			Authorization: `token ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ title, body })
	})
}

module.exports = { getRepo, getForm, createIssue }
