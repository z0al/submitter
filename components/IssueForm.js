// Packages
import React from 'react'
import { Form, Container, Message, Button } from 'semantic-ui-react'

class IssueForm extends React.Component {
	constructor() {
		super()
		this.state = { body: '', filter: '' }
	}
	//=============================================================================
	// > Hooks
	//=============================================================================

	componentWillMount() {
		// const { types } = this.props.meta
		// if (types && types.length > 0) {
		// 	this.setState({ filter: this.normalizeType(types[1]) })
		// }
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
			return <textarea placeholder={placeholder[1]} rows="3" />
		}
		return [<p>{help}</p>, <textarea rows="3" />]
	}

	renderNote() {
		const { note } = this.props.meta
		if (note) {
			return (
				<Message color="blue">
					<Message.Header>Note</Message.Header>
					<p>{note}</p>
				</Message>
			)
		}
		return null
	}

	renderFields() {
		return (
			this.props.fields
				// .filter(f => {
				// 	if (this.state.filter) {
				// 		return f.only_for === this.state.filter ? true : false
				// 	}
				// 	return true
				// })
				.map((f, key) => {
					return (
						<Form.Field key={key}>
							<label>{f.title}</label>
							{this.renderInput(f.help)}
						</Form.Field>
					)
				})
		)
	}

	render() {
		return (
			<Container
				textAlign="left"
				style={{ padding: '4em 0px', marginBottom: '50px' }}
			>
				<Form size="large">
					{this.renderNote()}
					<Form.Input placeholder="Title" />

					{this.renderFields()}

					<Form.Group style={{ float: 'right' }}>
						<Form.Button size="large">Preview</Form.Button>
						<Form.Button color="purple" size="large">
							Submit
						</Form.Button>
					</Form.Group>
				</Form>
			</Container>
		)
	}
}

export default IssueForm
