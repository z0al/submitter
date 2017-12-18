// Packages
const fetch = require('isomorphic-unfetch')
const passport = require('koa-passport')
const GitHub = require('passport-github')

// Ours
const { host } = require('../config/client')
const { clientID, clientSecret } = require('../config/env')

// GitHub strategy
passport.use(
	new GitHub(
		{ clientID, clientSecret, callbackURL: `${host}/login/callback` },
		(token, refreshToken, profile, done) => {
			const { login, avatar_url, html_url } = profile._json
			done(null, { login, avatar_url, html_url, token })
		}
	)
)

// Serialize/Deserialize user
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

module.exports = passport
