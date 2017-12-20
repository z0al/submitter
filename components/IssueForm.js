// Packages
import React from 'react'
import { Form, Container, Button, Divider, Breadcrumb } from 'semantic-ui-react'

// Components
import Field from './Field'
import IssueTypes from './IssueTypes'
import Note from './Note'

class IssueForm extends React.Component {
	constructor() {
		super()
		this.state = { body: '', filter: '' }
	}

	//===========================================================================
	// > Hooks
	//===========================================================================

	componentWillMount() {
		const { types } = this.props.meta
		if (types && types.length > 0) {
			this.setState({ filter: types[0].value })
		}
	}

	//===========================================================================
	// > Helpers
	//===========================================================================

	changeFilter(value) {
		this.setState({ filter: value })
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

	//===========================================================================
	// > Renderers
	//===========================================================================

	renderTypes() {
		if (this.props.meta.types) {
			return (
				<IssueTypes
					options={this.props.meta.types}
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
				return <Field key={f.title} title={f.title} help={f.help} />
			})
	}

	render() {
		const [owner, name] = this.props.path.split('/')

		return (
			<Container textAlign="left" style={{ padding: '4em 0px' }}>
				<Note text={this.props.meta.note} />

				<Breadcrumb size="huge">
					<i className="github large icon" style={{ marginLeft: '-0.1em' }} />
					<Breadcrumb.Section href={`https://github.com/${owner}`}>
						{owner}
					</Breadcrumb.Section>
					<i className="icon divider">/</i>
					<Breadcrumb.Section href={`https://github.com/${owner}/${name}`}>
						{name}
					</Breadcrumb.Section>
				</Breadcrumb>

				<Divider clearing hidden />

				<Form size="large" loading={this.props.loading}>
					<Form.Input placeholder="Title" size="big" required />
					<Divider />
					{this.renderTypes()}
					{this.renderFields()}
					<Divider hidden clearing horizontal />
					<Form.Button
						color="purple"
						size="large"
						floated="right"
						style={{ marginTop: '2em' }}
					>
						Submit
					</Form.Button>
				</Form>
			</Container>
		)
	}
}

export default IssueForm
