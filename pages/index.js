// Packages
import { Header, Form, Icon } from 'semantic-ui-react'

class IndexPage extends React.Component {
	constructor() {
		super()
		this.state = { slug: '' }
	}

	render() {
		return (
			<Form
				style={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center'
				}}
				action={this.state.slug}
			>
				<Header
					as="h2"
					content="A Prettier UI for Submitting GitHub Issues"
					style={{
						fontSize: '1.7em',
						fontWeight: 'normal'
					}}
				/>
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
		)
	}
}

export default IndexPage
