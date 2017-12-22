// Packages
import { Container, Divider, Icon } from 'semantic-ui-react'

export default () => (
	<Container textAlign="center">
		<Divider horizontal hidden clearing />
		<Icon name="code" size="large" /> with{' '}
		<Icon name="heart" color="red" size="large" /> by{' '}
		<a href="https://ahmed.sd">Ahmed T. Ali</a>
	</Container>
)
