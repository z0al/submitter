// CATUION: client side config only!

module.exports = {
	host:
		process.env.NODE_ENV !== 'production'
			? 'http://localhost:3000'
			: 'https://submit.now.sh'
}
