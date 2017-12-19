// Packages
import React from 'react'
import { Form, Container, Message, Button, Tab } from 'semantic-ui-react'

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

	filterFields(f) {
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
	}

	//=============================================================================
	// > Renderers
	//=============================================================================

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
			.filter(this.filterFields.bind(this))
			.map((f, key) => {
				return (
					<Form.Field key={key}>
						<label>{f.title}</label>
						{this.renderInput(f.help)}
					</Form.Field>
				)
			})
	}

	renderInput(help) {
		// If the text is surrounded between parenthesis then we render it as a
		// placeholder instead of normal description
		const placeholder = /\((.*)\)/.exec(help)
		if (placeholder) {
			return <Form.TextArea placeholder={placeholder[1]} autoHeight />
		}
		return [<p>{help}</p>, <Form.TextArea autoHeight />]
	}

	renderTabs() {
		const panes = [
			{
				menuItem: 'Write',
				pane: (
					<Tab.Pane key="tab-write" size="large">
						{this.renderFields()}
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Preview',
				pane: (
					<Tab.Pane
						key="tab-preview"
						size="large"
						style={{ marginBottom: '1rem' }}
					>
						<p>Nothing to preview </p>
					</Tab.Pane>
				)
			}
		]
		return <Tab panes={panes} renderActiveOnly={false} />
	}

	render() {
		return (
			<Container
				textAlign="left"
				style={{ padding: '4em 0px', marginBottom: '50px' }}
			>
				{this.renderNote()}
				<Form size="large">
					{this.renderTypes()}
					<Form.Input placeholder="Title" required />

					{this.renderTabs()}

					<Form.Button color="purple" size="large" floated="right">
						Submit
					</Form.Button>
				</Form>
			</Container>
		)
	}
}

export default IssueForm
