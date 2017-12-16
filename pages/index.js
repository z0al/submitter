// Packages
import Head from 'next/head'

const IndexPage = () => [
	<Head>
		<title>Submit | A Prettier Interface For Submitting GitHub Issues</title>
	</Head>,
	<form action="/form" method="get">
		<input name="repo" type="text" />
	</form>
]

export default IndexPage
