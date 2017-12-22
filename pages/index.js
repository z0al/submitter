// Packages
import React from 'react'
import { Header, Form, Icon, Container } from 'semantic-ui-react'

// Ours
import fetch from '../lib/fetch'
import Page from '../layout/Page'

class IndexPage extends React.Component {
	constructor() {
		super()
		this.state = { slug: '' }
	}

	static async getInitialProps({ req }) {
		// Get user profile
		const res = await fetch(req, '/api/userinfo')
		let profile = null
		if (res.ok) {
			profile = await res.json()
		}
		return { profile }
	}

	render() {
		return (
			<Page profile={this.props.profile}>
				<Form className="prefectly-centered" action={this.state.slug}>
					<Header as="h1">
						Submitter
						<Header.Subheader>
							A Prettier UI for Submitting GitHub Issues
						</Header.Subheader>
					</Header>
					<Form.Input
						size="large"
						icon="github"
						iconPosition="left"
						placeholder="e.g microsoft/vscode"
						onChange={e => this.setState({ slug: `/to/${e.target.value}` })}
					/>
					<Form.Button positive size="large">
						GET STARTED
					</Form.Button>
				</Form>
			</Page>
		)
	}
}

export default IndexPage
