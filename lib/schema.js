// Packages
const Joi = require('joi')
const { JSON_SCHEMA, safeLoad } = require('js-yaml')

const schema = Joi.object().keys({
	meta: Joi.object()
		.default({})
		.keys({
			types: Joi.array().default([]),
			note: Joi.string().default(null)
		}),
	form: Joi.object().pattern(/.*/, [
		Joi.string().allow('', null),
		Joi.object().keys({
			help: Joi.string().default(null),
			for: Joi.string().default(null)
		})
	])
})

// Validate against the defined schema
async function validate(str) {
	const json = safeLoad(str, { schema: JSON_SCHEMA })
	const res = Joi.validate(json, schema)
	if (res.error) {
		throw res.error
	}
	return res.value
}

module.exports = validate
