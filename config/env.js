module.exports = {
	client_id: process.env.AUTH0_CLIENT_ID,
	client_secret: process.env.AUTH0_CLIENT_SECRET,
	dev: process.env.NODE_ENV !== 'production',
	port: parseInt(process.env.PORT, 10) || 3000
}
