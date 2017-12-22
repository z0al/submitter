// Packages
import Head from 'next/head'

export default () => (
	<Head>
		<meta charSet="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
		<title>Submitter 🚀 | A Prettier UI for Submitting GitHub Issues</title>
		<link rel="stylesheet" href="/static/css/semantic.min.css" />
		<link rel="stylesheet" href="/static/css/Draft.css" />
		<link rel="stylesheet" href="/static/css/prism.css" />
		<style jsx global>
			{`
				*:not(.icon) {
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
						Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
						sans-serif !important;
				}

				body {
					height: 100vh;
				}

				/* normalize divs surrounding the content*/
				#__next {
					display: flex;
					flex-direction: column;
					flex-grow: 1;
				}

				#__next {
					min-height: 100%;
					min-width: 100%;
					height: 100%;
					width: 100%;
				}

				.app-wrapper {
					display: flex;
					flex-direction: column;
					padding: 1em 0em;
					min-height: 100%;
				}

				.content-wrapper {
					display: flex !important;
					flex-direction: column;
					flex-grow: 1;
				}

				.prefectly-centered {
					height: 100% !important;
					display: flex !important;
					flex-direction: column;
					justify-content: center;
					flex-grow: 1;
				}
				/* Draft.js Editor */
				.field > div.DraftEditor-root {
					padding: 1em 0em;
				}
				/* Fix Draft.js embedded images */
				.field > div.DraftEditor-root img {
					height: 100%;
					width: 100%;
				}
				.field > div.DraftEditor-root img:hover {
					border: 1px solid purple;
				}

				/* Remove border of issue title field */
				div.required.field > .ui.input,
				div.required.field > .ui.input > input {
					border: none;
					padding: 0px;
				}
			`}
		</style>
	</Head>
)
