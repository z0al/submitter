module.exports = {
	client_id: process.env.AUTH0_CLIENT_ID,
	dev: process.env.NODE_ENV !== 'production',
	port: parseInt(process.env.PORT, 10) || 3000
}
