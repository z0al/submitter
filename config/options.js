// Ours
const { dev } = require('./env')
module.exports = {
	// Cookies options
	cookies: {
		httpOnly: true,
		overwrite: true,
		signed: true,
		secure: !dev
	}
}
