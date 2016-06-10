"use strict";

import React from 'react'

import Chart from './Chart'

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import Label from 'react-bootstrap/lib/Label';
import Button from 'react-bootstrap/lib/Button';

import AutoWidth from '@zalando/react-automatic-width';

class ChartWithHeader extends React.Component{
    constructor(props){
        super(props);

        this.handleDeleteThisChart = this.handleDeleteThisChart.bind(this);
    }

    handleDeleteThisChart() {
        this.props.onDelete(this.props.title);
    }

    render() {
        return (
            <Row className="show-grid">
                <Col md={12}>
                    <Panel>
                        <hr/>
                        <h2>
                            <Label bsStyle="success">
                                {this.props.title}
                            </Label>
                        </h2>
                        <Button
                            bsStyle="danger" bsSize="xsmall"
                            onClick = {this.handleDeleteThisChart}>
                            X
                        </Button>
                        <AutoWidth className="responsive">
                            <Chart
                                dataSet = {this.props.dataSet}
                                viewPortDateRange = {this.props.viewPortDateRange}
                            />
                        </AutoWidth>
                    </Panel>
                </Col>
            </Row>
        )
    }
}

ChartWithHeader.propTypes = {
    title: React.PropTypes.string,
    dataSet: React.PropTypes.object,
    viewPortDateRange: React.PropTypes.shape({
        startDate: React.PropTypes.object,
        endDate: React.PropTypes.object
    }),
    onDelete: React.PropTypes.func
};

export default ChartWithHeader;
