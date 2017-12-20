// Packages
import { Message } from 'semantic-ui-react'

const Note = props => {
	if (props.text) {
		return (
			<Message color="yellow">
				<Message.Header>Note</Message.Header>
				<p>{props.text}</p>
			</Message>
		)
	}
	return null
}

export default Note
