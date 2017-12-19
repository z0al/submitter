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
	Icon
} from 'semantic-ui-react'

export default class MyDocument extends Document {
	static getInitialProps({ renderPage }) {
		const { html, head, errorHtml, chunks } = renderPage()
		const styles = flush()
		return { html, head, errorHtml, chunks, styles }
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
								display: flex;
								flex-direction: column;
								padding: 1em 0em;
								min-height: 100%;
							}
							.content-wrapper {
								flex-grow: 1;
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
										src="/static/rocket.svg"
										alt="rocket emoji"
									/>
									<Label pointing="left" color="purple">
										BETA
									</Label>
								</Menu.Item>
								<Menu.Item position="right">
									<Button
										basic
										as="a"
										href="https://github.com/ahmed-taj/submitter"
									>
										<Icon name="fork" />
										Fork on GitHub
									</Button>
								</Menu.Item>
							</Menu>
						</Container>
						<Container text className="content-wrapper">
							<Main />
							<NextScript />
						</Container>
						<Container textAlign="center">
							<Divider horizontal hidden clearing />
							<Icon name="code" size="large" /> with{' '}
							<Icon name="heart" color="red" size="large" /> by Ahmed T. Ali
						</Container>
					</Segment>
				</body>
			</html>
		)
	}
}
