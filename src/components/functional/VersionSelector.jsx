"use strict";

import React from 'react'
import Multiselect from 'react-widgets/lib/Multiselect'
import Button from 'react-bootstrap/lib/Button';

const OUTER_STYLE = {display: 'flex'};
const SELECTOR_DIV_STYLE = {minWidth: '200px'};
const BUTTON_STYLE = {marginLeft: '10px'};

class VersionSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: [],
            lastRemovedVersion: undefined
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSelect(values) {
        this.setState({values: values});
        this.props.onChange(values);
    }

    handleReset() {
        this.handleSelect([]);
    }

    componentWillReceiveProps(nextProps) {
        let rVersion = nextProps.removeVersion;
        if (rVersion !== undefined && rVersion !== this.state.lastRemovedVersion) {
            const newValues = this.state.values.filter((v) => {
                return v.value != rVersion
            });
            this.setState({
                values: newValues,
                lastRemovedVersion: rVersion
            });
        }
    }

    render() {
        return (
            <div>
                <h3>Select versions</h3>
                <div style = {OUTER_STYLE}>
                    <div style = {SELECTOR_DIV_STYLE}>
                        <Multiselect
                            valueField = 'value'
                            textField  = 'text'
                            value      = {this.state.values}
                            data       = {this.props.versions}
                            onChange   = {this.handleSelect}
                            busy       = {this.props.isLoading}
                            disabled   = {this.props.isLoading}
                        />
                    </div>
                    <Button
                        style   = {BUTTON_STYLE}
                        bsStyle = 'primary'
                        bsSize  = 'xsmall'
                        onClick = {this.handleReset}>
                        Reset
                    </Button>
                </div>
            </div>
        )
    }
};

VersionSelector.propTypes = {
    removeVersion: React.PropTypes.string,
    versions: React.PropTypes.arrayOf(React.PropTypes.shape({
        text: React.PropTypes.string,
        value: React.PropTypes.string
    })).isRequired,
    onChange: React.PropTypes.func.isRequired
};

export default VersionSelector;
