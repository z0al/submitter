// Packages
import { Segment, Container } from 'semantic-ui-react'

// Ours
import Meta from './Meta'
import Navbar from './Navbar'
import Footer from './Footer'
import fetch from '../lib/fetch'

export default ({ children, profile }) => {
	return (
		<Segment textAlign="center" className="app-wrapper" vertical>
			<Meta />
			<Container text>
				<Navbar profile={profile} />
			</Container>
			<Container text className="content-wrapper">
				{children}
			</Container>
			<Footer />
		</Segment>
	)
}
