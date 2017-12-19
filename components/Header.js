// Packages
import { Menu, Label, Image, Dropdown, Button } from 'semantic-ui-react'

class Header extends React.Component {
	renderProfile() {
		if (this.props.profile === null) {
			return (
				<Button basic color="brown" as="a" href="/login">
					Sign in / Sign up
				</Button>
			)
		} else {
			const { login, avatar_url, html_url } = this.props.profile

			const trigger = (
				<span>
					<Image avatar src={avatar_url} /> {login}
				</span>
			)

			const options = [
				{ key: 'profile', text: 'Your Profile', href: html_url },
				{ key: 'sign-out', text: 'Sign Out', href: '/logout' }
			]

			return <Dropdown trigger={trigger} options={options} />
		}
	}

	render() {
		return (
			<Menu secondary size="small">
				<Menu.Item>
					<Image
						href="/"
						size="mini"
						src="/static/images/rocket.svg"
						alt="rocket emoji"
					/>
					<Label pointing="left" color="purple">
						BETA
					</Label>
				</Menu.Item>
				<Menu.Item position="right">{this.renderProfile()}</Menu.Item>
			</Menu>
		)
	}
}

export default Header
