// Packages
const Joi = require('joi')
const YAML = require('js-yaml')

const schema = Joi.object().keys({
	meta: Joi.object().keys({
		types: Joi.array().default([]),
		note: Joi.string().default(null)
	}),
	form: Joi.object().pattern(/.*/, [
		Joi.string(),
		Joi.object().keys({
			help: Joi.string().default(null),
			for: Joi.string().default(null)
		})
	])
})

// Validate against the defined schema
async function validate(str) {
	try {
		const yml = YAML.safeLoad(str)
		const res = Joi.validate(yml, schema)
		return res.error !== null ? { valid: false } : { valid: true, ...res.value }
	} catch (err) {
		return { valid: false }
	}
}

module.exports = validate
