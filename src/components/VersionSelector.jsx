"use strict";

import React from 'react'

import Multiselect from 'react-widgets/lib/Multiselect'

import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class VersionSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: [],
            lastRemovedVersion: undefined
        }

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
            let newValues = this.state.values.filter((v) => {
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
            <Row className="show-grid">
                <Col md={12}>
                    <span>Select versions</span>
                    <Multiselect
                        valueField = 'value'
                        textField = 'text'
                        value = {this.state.values}
                        data = {this.props.versions}
                        onChange = {this.handleSelect}
                        busy = {this.props.isLoading}
                        disabled = {this.props.isLoading}
                    />
                    <Button
                        bsStyle = "primary" bsSize="xsmall"
                        onClick = {this.handleReset}>
                        Reset
                    </Button>
                </Col>
            </Row>
        )
    }
};

VersionSelector.propTypes = {
    removeVersion: React.PropTypes.string,
    versions: React.PropTypes.array,
    onChange: React.PropTypes.func
};

export default VersionSelector;
