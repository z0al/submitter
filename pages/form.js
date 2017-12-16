// Ours
import { host } from '../config/client'
import fetch from '../lib/fetch'

class FormPage extends React.Component {
	static async getInitialProps({ req }) {
		const res = await fetch(req, req.url, { method: 'POST' })
		if (res.ok) {
			const details = await res.json()
			return { found: true, ...details }
		}
		return { found: false }
	}

	render() {
		// Repository not found
		if (!this.props.found) {
			return <h1>We couldn't find the repository you're looking for!</h1>
		}
		if (!this.props.possible) {
			return (
				<h1>
					The repository is either archived or the issues are disabled, Sorry!
				</h1>
			)
		}
		return <h1>Nothing yet, Sorry!</h1>
	}
}

export default FormPage
