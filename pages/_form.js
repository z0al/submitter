// Ours
import { host } from '../config/client'
import fetch from '../lib/fetch'

// Components
import Form from '../components/Form'

class FormPage extends React.Component {
	static async getInitialProps({ req }) {
		// Extract owner and name
		const match = /to\/([^\/]+)\/([^\/]+)/.exec(req.url)
		const owner = match[1]
		const name = match[2]

		const full_name = `${owner}/${name}`

		// Request submit.yml file
		const res = await fetch(req, `/api/${full_name}/submit.yml`)

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
			return <Form src={this.props.src} />
		} else {
			return (
				<p>
					Looks like the repository at {this.props.full_name} isn't submission
					friendly!
				</p>
			)
		}
	}
}

export default FormPage
