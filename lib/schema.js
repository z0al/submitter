// Packages
const Joi = require('joi')
const YAML = require('js-yaml')

const schema = Joi.object().keys({
	meta: Joi.object()
		.keys({
			types: Joi.array(),
			tip: Joi.string()
		})
		.default({ types: [], tip: '' }),
	form: Joi.object().default({})
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
