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
						`}
					</style>
				</Head>
				<body>
					<Segment
						textAlign="center"
						style={{ minHeight: '100%', padding: '1em 0em' }}
						vertical
					>
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
						<Container text>
							<Main />
							<NextScript />
						</Container>
					</Segment>
				</body>
			</html>
		)
	}
}
