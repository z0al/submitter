// Packages
const Router = require('koa-router')

const api = new Router()

// Auth
api.get('/login', async ctx => {
  // TODO: Write login logic here
})

api.get('/logout', async ctx => {
  // TODO: Write logout logic here
})

module.exports = api
