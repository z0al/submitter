import { FormField, FormTextArea } from 'semantic-ui-react'

class Field extends React.Component {
	renderInput() {
		// If the text is surrounded between parenthesis then we render it as a
		// placeholder instead of normal description
		const placeholder = /\((.*)\)/.exec(this.props.help)
		if (placeholder) {
			return <FormTextArea placeholder={placeholder[1]} autoHeight />
		}
		return [<p>{this.props.help}</p>, <FormTextArea autoHeight />]
	}

	render() {
		return (
			<FormField key={this.props.key}>
				<label>{this.props.title}</label>
				{this.renderInput()}
			</FormField>
		)
	}
}

export default Field
