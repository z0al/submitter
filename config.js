module.exports = {
  port: parseInt(process.env.PORT, 10) || 3000,
  dev: process.env.NODE_ENV !== 'production'
}
