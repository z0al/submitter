// Packages
import { Container, Header } from 'semantic-ui-react'

const Error = props => {
	return (
		<Container className="prefectly-centered">
			<Header as="h1">
				):
				<Header.Subheader>{props.children}</Header.Subheader>
			</Header>
		</Container>
	)
}

export default Error
