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
		const { types } = this.props.meta
		if (types && types.length > 0) {
			this.setState({ filter: this.normalizeType(types[0]) })
		}
	}

	//=============================================================================
	// > Helpers
	//=============================================================================

	normalizeType(typestr) {
		return typestr.toLowerCase().replace(/\s{2,}/g, ' ')
	}

	changeFilter(event, data) {
		this.setState({ filter: data.value })
	}

	//=============================================================================
	// > Renderers
	//=============================================================================

	renderInput(help) {
		// If the text is surrounded between parenthesis then we render it as a
		// placeholder instead of normal description
		const placeholder = /\((.*)\)/.exec(help)
		if (placeholder) {
			return <Form.TextArea placeholder={placeholder[1]} autoHeight />
		}
		return [<p>{help}</p>, <Form.TextArea autoHeight />]
	}

	renderNote() {
		const { note } = this.props.meta
		if (note) {
			return (
				<Message color="yellow">
					<Message.Header>Note</Message.Header>
					<p>{note}</p>
				</Message>
			)
		}
		return null
	}

	renderTypes() {
		const { types } = this.props.meta
		if (types) {
			const options = types.map(t => ({
				text: t,
				value: this.normalizeType(t)
			}))
			return (
				<Form.Dropdown
					inline
					label="I'm submitting"
					options={options}
					style={{ color: 'purple' }}
					defaultValue={options[0].value}
					onChange={this.changeFilter.bind(this)}
				/>
			)
		}
		return null
	}

	renderFields() {
		return this.props.fields
			.filter(f => {
				if (this.state.filter) {
					if (f.only_for === null) {
						return true
					}
					if (f.only_for === this.state.filter) {
						return true
					}
					return false
				}
				return true
			})
			.map((f, key) => {
				return (
					<Form.Field key={key}>
						<label>{f.title}</label>
						{this.renderInput(f.help)}
					</Form.Field>
				)
			})
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

					{this.renderTypes()}
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
