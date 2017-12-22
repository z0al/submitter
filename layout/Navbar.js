// Packages
import { Menu, Label, Image, Dropdown, Button } from 'semantic-ui-react'

export default class extends React.Component {
	renderProfile() {
		if (!this.props.profile) {
			return (
				<Button basic color="brown" as="a" href="/login">
					Sign in / Sign up
				</Button>
			)
		} else {
			const { login, avatar_url, html_url } = this.props.profile

			return (
				<Dropdown
					trigger={
						<span>
							<Image avatar src={avatar_url} />
						</span>
					}
					options={[
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
					]}
					pointing="bottom right"
				/>
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
						PREVIEW
					</Label>
				</Menu.Item>
				<Menu.Item position="right">{this.renderProfile()}</Menu.Item>
			</Menu>
		)
	}
}
