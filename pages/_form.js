// Packages
import { Container, Header } from 'semantic-ui-react'

// Ours
import { host } from '../config/client'
import fetch from '../lib/fetch'

// Components
import IssueForm from '../components/IssueForm'

class FormPage extends React.Component {
	static async getInitialProps({ req }) {
		// Extract owner and name
		const match = /to\/([^\/]+)\/([^\/]+)/.exec(req.url)
		const owner = match[1]
		const name = match[2]

		const full_name = `${owner}/${name}`

		// Request submit.yml file
		const res = await fetch(req, `/api/${full_name}/submit.json`)

		if (!res.ok) {
			return { found: false, full_name }
		}

		try {
			const src = await res.json()
			return { found: true, src, full_name }
		} catch (err) {
			return { found: false, full_name }
		}
	}

	render() {
		if (this.props.found) {
			return (
				<IssueForm
					meta={this.props.src.meta}
					fields={this.props.src.form}
					path={this.props.full_name}
				/>
			)
		} else {
			return (
				<Container style={{ paddingTop: '10em' }}>
					<Header as="h1">
						):
						<Header.Subheader>
							Looks like the repository at{' '}
							<a
								href={`https://github.com/${this.props.full_name}`}
								style={{ color: 'blue', fontWeight: 'bold' }}
							>
								{this.props.full_name}
							</a>{' '}
							isn't submission friendly!
						</Header.Subheader>
					</Header>
				</Container>
			)
		}
	}
}

export default FormPage
