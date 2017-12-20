// Packages
import { FormField } from 'semantic-ui-react'
import { EditorState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import MarkdownPlugin from 'draft-js-markdown-plugin'
import PrismPlugin from 'draft-js-prism-plugin'

// Prism
import prism from 'prismjs'

// Editor plugins
const plugins = [PrismPlugin({ prism }), MarkdownPlugin()]

class Field extends React.Component {
	state = {
		// A workaround to turn off Draft.js rendering on the server side
		onBrowser: false,
		content: EditorState.createEmpty()
	}

	componentDidMount = () => {
		// We are no longer on server
		this.setState({ onBrowser: true })
	}

	onChange = content => {
		this.setState({ content })
	}

	render() {
		const { onBrowser } = this.state
		return (
			<FormField>
				<label>{this.props.title}</label>
				{onBrowser ? (
					<Editor
						editorState={this.state.content}
						onChange={this.onChange}
						plugins={plugins}
					/>
				) : null}
				<pre>{this.state.content.getCurrentContent().getPlainText()}</pre>
			</FormField>
		)
	}
}

export default Field
