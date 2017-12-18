// Packages
import { Header, FormButton, Form, FormInput, Icon } from 'semantic-ui-react'

class IndexPage extends React.Component {
	constructor() {
		super()
		this.state = { slug: '' }
	}

	render() {
		return (
			<Form style={{ marginTop: '9em' }} action={this.state.slug}>
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
					placeholder="e.g microsoft/vscode"
					onChange={e => this.setState({ slug: `/to/${e.target.value}` })}
				/>
				<FormButton positive size="large">
					GET STARTED
				</FormButton>
			</Form>
		)
	}
}

export default IndexPage
