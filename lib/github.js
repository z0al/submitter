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

module.exports = { getRepo, getForm }
