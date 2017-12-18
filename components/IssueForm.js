// Packages
import React from 'react'

class IssueForm extends React.Component {
	constructor() {
		super()
		this.state = { body: '', filter: '' }
	}
	//=============================================================================
	// > Hooks
	//=============================================================================

	componentWillMount() {
		const { types } = this.props.meta
		if (types && types.length > 0) {
			this.setState({ filter: this.normalizeType(types[1]) })
		}
	}

	//=============================================================================
	// > Helpers
	//=============================================================================

	normalizeType(typestr) {
		return typestr.toLowerCase().replace(/\s{2,}/g, ' ')
	}

	changeFilter(event) {
		// TODO
	}

	//=============================================================================
	// > Renderers
	//=============================================================================

	renderInput(help) {
		// If the text is surrounded between parenthesis then we render it as a
		// placeholder instead of normal description
		const placeholder = /\((.*)\)/.exec(help)
		if (placeholder) {
			return <textarea placeholder={placeholder[1]} />
		}
		return [<p>{help}</p>, <textarea />]
	}

	renderMeta() {
		const meta = []
		const { types, note } = this.props.meta
		if (note) {
			meta.push(<p> NOTE: {note}</p>)
		}
		if (types && types.length > 0) {
			// TODO
		}
		return meta
	}

	renderFields() {
		return this.props.fields
			.filter(f => {
				if (this.state.filter) {
					return f.only_for === this.state.filter ? true : false
				}
				return true
			})
			.map((f, key) => {
				return (
					<div key={key}>
						<label>{f.title}</label>
						{this.renderInput(f.help)}
					</div>
				)
			})
	}

	render() {
		return (
			<form action={'/to/' + this.props.path} method="POST">
				{this.renderMeta()}
				{this.renderFields()}
				<h4>Meta</h4>
				<pre>{JSON.stringify(this.props.meta, null, 2)}</pre>
				<h4>Fields</h4>
				<pre>{JSON.stringify(this.props.fields, null, 2)}</pre>
			</form>
		)
	}
}

export default IssueForm
