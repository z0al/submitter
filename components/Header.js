// Packages
import { Menu, Label, Image, Dropdown, Button, Form } from 'semantic-ui-react'

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
					<Image avatar src={avatar_url} />
				</span>
			)

			const options = [
				{
					key: 'user',
					text: (
						<span>
							Signed in as <strong>{login}</strong>
						</span>
					),
					disabled: true
				},
				{ key: 'profile', text: 'Your Profile', href: html_url },
				{ key: 'sign-out', text: 'Sign Out', href: '/logout' }
			]

			return (
				<Dropdown trigger={trigger} options={options} pointing="bottom right" />
			)
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
