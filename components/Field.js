// Packages
import { FormField } from 'semantic-ui-react'
import { EditorState, convertToRaw } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import MarkdownPlugin from 'draft-js-markdown-plugin'
import PrismPlugin from 'draft-js-prism-plugin'
import { draftToMarkdown } from 'markdown-draft-js'

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
		this.props.onChange(
			this.props.title,
			draftToMarkdown(convertToRaw(content.getCurrentContent()))
		)
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
						placeholder={this.props.help || 'Write here'}
					/>
				) : null}
			</FormField>
		)
	}
}

export default Field
