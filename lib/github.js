// Ours
const fetch = require('isomorphic-unfetch')

/**
 * Try to fetch repository details using GitHub API
 *
 * @param {string} token
 * @param {string} repo
 */
async function getRepo(token, repo) {
	// Get /repos/:owner/:repo
	const res = await fetch(
		`https://api.github.com/repos/${repo}?access_token=${token}`
	)

	if (res.ok) {
		return res.json()
	}
	return null
}

/**
 * Try to fetch `submit.yml` file from the given repository.
 *
 * @param {string} owner
 * @param {string} repo
 * @param {string} branch
 */
async function getForm(repo, branch) {
	const params = `${repo}/${branch}/submit.yml`
	const res = await fetch(`https://raw.githubusercontent.com/${params}`)
	if (res.ok) {
		return []
	}
	return []
}

module.exports = { getRepo, getForm }