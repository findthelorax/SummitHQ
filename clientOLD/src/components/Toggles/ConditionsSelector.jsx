import React from 'react';
import { Conditions } from '../../helpers/constants';

class ConditionSelectRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.data.status || Conditions.DEFAULT,
        };
    }

    getValue() {
        return this.state.value;
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
        this.props.setValue(event.target.value);
    };

    render() {
        return (
            <div>
                <span>{this.state.value}</span> &nbsp;
                <select onChange={this.handleChange} value={this.state.value}>
                    {Object.values(Conditions).map((condition) => (
                        <option key={condition} value={condition}>
                            {condition}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

export default ConditionSelectRenderer;