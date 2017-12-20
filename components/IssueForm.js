// Packages
import React from 'react'
import { Form, Container, Button, Tab } from 'semantic-ui-react'

// Components
import Field from './Field'
import IssueTypes from './IssueTypes'
import Note from './Note'

class IssueForm extends React.Component {
	constructor() {
		super()
		this.state = { body: '', filter: '' }
		this.typesMap = null
	}

	//===========================================================================
	// > Hooks
	//===========================================================================

	componentWillMount() {
		const { types } = this.props.meta
		if (types && types.length > 0) {
			this.typesMap = types.map(t => ({
				text: t,
				value: this.normalizeType(t)
			}))

			this.setState({ filter: this.typesMap[0].text })
		}
	}

	normalizeType(str) {
		return str.toLowerCase().replace(/\s{2,}/g, ' ')
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
		if (this.typesMap) {
			return (
				<IssueTypes
					options={this.typesMap}
					onChange={this.changeFilter.bind(this)}
				/>
			)
		}
		return null
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

	renderFields() {
		return this.props.fields
			.filter(this.filterFields.bind(this))
			.map((f, key) => {
				return <Field key={'field_' + key} title={f.title} help={f.help} />
			})
	}

	render() {
		return (
			<Container textAlign="left" style={{ padding: '4em 0px' }}>
				<Note text={this.props.meta.note} />

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
