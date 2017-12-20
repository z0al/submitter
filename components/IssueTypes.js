// Packages
import { FormDropdown } from 'semantic-ui-react'

class IssueTypes extends React.Component {
	render() {
		return (
			<FormDropdown
				inline
				label="I'm submitting"
				options={this.props.options}
				style={{ color: 'purple' }}
				defaultValue={this.props.options[0].value}
				onChange={(e, d) => this.props.onChange(d.value)}
			/>
		)
	}
}

export default IssueTypes
