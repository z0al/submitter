// Packages
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import { Segment, Container, Divider, Icon } from 'semantic-ui-react'

// Ours
import fetch from '../lib/fetch'

// Components
import Header from '../components/Header'

export default class MyDocument extends Document {
	class
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
					<style jsx global>
						{`
							*:not(.icon) {
								font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
									Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
									Helvetica Neue, sans-serif !important;
							}

							body {
								height: 100vh;
							}

							/* normalize divs surrounding the content*/
							#__next {
								height: 100%;
							}

							.app-wrapper {
								display: flex;
								flex-direction: column;
								padding: 1em 0em;
								min-height: 100%;
							}

							.content-wrapper {
								flex-grow: 1;
							}

							.prefectly-centered {
								height: 100% !important;
								display: flex !important;
								flex-direction: column;
								justify-content: center;
							}
						`}
					</style>
				</Head>
				<body>
					<Segment textAlign="center" className="app-wrapper" vertical>
						<Container>
							<Header profile={this.props.profile} />
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
