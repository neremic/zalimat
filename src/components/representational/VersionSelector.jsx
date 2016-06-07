import React from 'react'
import Multiselect from 'react-widgets/lib/Multiselect'
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class VersionSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: []
        }
    }

    handleChange(_values) {
        this.setState({values: _values});
        this.props.onChange(_values);
    }

    handleReset() {
        this.handleChange([]);
    }

    render() {
        return (
                <Row className="show-grid">
                    <Col md={12}>
                        <span>Title</span>
                        <Multiselect
                            valueField = 'value'
                            textField = 'text'
                            value = {this.state.values}
                            data = {this.props.versions}
                            onChange = {this.handleChange.bind(this)}>
                        </Multiselect>
                        <Button
                            bsStyle="primary" bsSize="xsmall"
                            onClick = {this.handleReset.bind(this)}>
                            Reset
                        </Button>
                    </Col>
                </Row>
        )
    }
};



export default VersionSelector;
