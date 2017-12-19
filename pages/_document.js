// Packages
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import {
	Segment,
	Container,
	Menu,
	Button,
	Image,
	Label,
	Divider,
	Dropdown,
	Icon
} from 'semantic-ui-react'

// Ours
import fetch from '../lib/fetch'

export default class MyDocument extends Document {
	static async getInitialProps({ renderPage, req }) {
		const { html, head, errorHtml, chunks } = renderPage()
		const styles = flush()
		// Get user profile
		const res = await fetch(req, '/api/userinfo')
		let profile = null
		if (res.ok) {
			profile = await res.json()
		}
		return { html, head, errorHtml, chunks, styles, profile }
	}

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
			<html lang="en">
				<Head>
					<meta charset="UTF-8" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<meta http-equiv="X-UA-Compatible" content="ie=edge" />
					<title>
						Submitter 🚀 | A Prettier UI for Submitting GitHub Issues
					</title>
					<link rel="stylesheet" href="/static/css/semantic.min.css" />
					<style>
						{`
							*:not(.icon) {
								font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif !important;
							}
							body {
								height: 100vh;
							}
							/* normalize divs surrounding the content*/
							#__next {
								height: 100%;
							}
							.app-wrapper {
								display: -webkit-box;
								display: -ms-flexbox;
								display: flex;
								-webkit-box-orient: vertical;
								-webkit-box-direction: normal;
								    -ms-flex-direction: column;
								        flex-direction: column;
								padding: 1em 0em;
								min-height: 100%;
							}
							.content-wrapper {
								-webkit-box-flex: 1;
								    -ms-flex-positive: 1;
								        flex-grow: 1;
							}
							.prefectly-centered {
								height: 100% !important;
								display: -webkit-box !important;
								display: -ms-flexbox !important;
								display: flex !important;
								-webkit-box-orient: vertical;
								-webkit-box-direction: normal;
								    -ms-flex-direction: column;
								        flex-direction: column;
								-webkit-box-pack: center;
								    -ms-flex-pack: center;
								        justify-content: center;
							}
						`}
					</style>
				</Head>
				<body>
					<Segment textAlign="center" className="app-wrapper" vertical>
						<Container>
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
						</Container>
						<Container text className="content-wrapper">
							<Main />
							<NextScript />
						</Container>
						<Container textAlign="center">
							<Divider horizontal hidden clearing />
							<Icon name="code" size="large" /> with{' '}
							<Icon name="heart" color="red" size="large" /> by{' '}
							<a href="https://ahmed.sd">Ahmed T. Ali</a>
						</Container>
					</Segment>
				</body>
			</html>
		)
	}
}
