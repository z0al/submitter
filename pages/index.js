// Packages
import { Header, Button, Form, FormInput, Icon } from 'semantic-ui-react'

class IndexPage extends React.Component {
	constructor() {
		super()
		this.state = { slug: '' }
	}

	render() {
		return (
			<Form style={{ marginTop: '9em' }}>
				<Header
					as="h2"
					content="A Prettier UI for Submitting GitHub Issues"
					style={{
						fontSize: '1.7em',
						fontWeight: 'normal'
					}}
				/>
				<FormInput
					size="large"
					icon="search"
					iconPosition="left"
					name="slug"
					placeholder="e.g microsoft/vscode"
					onChange={e => this.setState({ slug: `to/${e.target.value}` })}
				/>
				<Button positive size="large" href={this.state.slug}>
					GET STARTED
				</Button>
			</Form>
		)
	}
}

export default IndexPage
