// Ours
import fetch from '../lib/fetch'

class FormPage extends React.Component {
	static async getInitialProps({ req }) {
		const res = await fetch(req, '/userinfo')
		const profile = await res.json()

		return { profile }
	}

	render() {
		return (
			<div>
				<h1>Coming soon! Thank you {this.props.profile.login}</h1>
			</div>
		)
	}
}

export default FormPage
