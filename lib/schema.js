// Packages
const Joi = require('joi')
const { JSON_SCHEMA, safeLoad } = require('js-yaml')
const slug = require('slug')

// Slugify options
const mode = slug.defaults.modes['rfc3986']

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

// Turn form object into array of fields for easier processing and slugify
// issue types.
function normalizeForm(obj) {
	const { meta, form } = obj
	if (meta.types) {
		meta.types = meta.types.map(t => ({
			text: t,
			value: slug(t, mode)
		}))
	}

	const fields = []
	for (const key of Object.keys(form)) {
		const value = form[key]

		if (typeof value === 'object') {
			fields.push({
				title: key,
				help: value.help,
				only_for:
					typeof value.for === 'string' ? slug(value.for, mode) : value.for
			})
		} else {
			// String
			fields.push({ title: key, help: value, only_for: null })
		}
	}
	return { meta, form: fields }
}

// Validate against the defined schema
async function validate(str) {
	const json = safeLoad(str, { schema: JSON_SCHEMA })
	const res = Joi.validate(json, schema)
	if (res.error) {
		throw res.error
	}
	return normalizeForm(res.value)
}

module.exports = validate
