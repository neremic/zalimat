"use strict";

import React from 'react'

import Chart from './Chart.jsx'

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
        this.props.onDelete(this.props.versionId);
    }

    render() {
        const {title, dataSet, viewPortDateRange, applicationId, versionId, height, children} = this.props;

        let childrenWithProps = [];
        const childWithProps = React.Children.map(this.props.children,
            (child, index) => {
                let clonedChild = React.cloneElement(child, {
                    key: `${applicationId}${versionId}${index}`,
                    applicationId: applicationId,
                    versionId: versionId
                });
                childrenWithProps.push(clonedChild);
            }
        );

        let chartAndOrLoader = [];

        if (!dataSet) {
            chartAndOrLoader.push(
                <h1 key = 'h1loading'
                    style = {{height : "200px"}}>
                    Loading...
                </h1>
            );
        } else if (dataSet && dataSet.values.length == 0) {
            chartAndOrLoader.push(
                <h1 key = 'h1laodingnewdata'
                    style = {{height : "200px"}}>
                    Loading new data...
                </h1>
            );
        } else if (dataSet && dataSet.values.length > 0) {
            chartAndOrLoader.push(
                <AutoWidth
                    className="responsive"
                    key = 'autowidth-key'>
                    <Chart
                        dataSet = {dataSet}
                        viewPortDateRange = {viewPortDateRange}
                        height = {height}
                    />
                </AutoWidth>
            );
        }

        return (
            <Row className="show-grid">
                <Col md={12}>
                    <Panel>
                        <hr/>
                        <h2>
                            <Label bsStyle="success">
                                {title}
                                <Button
                                    bsStyle="danger" bsSize="xsmall"
                                    onClick = {this.handleDeleteThisChart}>
                                    X
                                </Button>
                            </Label>
                        </h2>
                        {chartAndOrLoader}
                        {childrenWithProps}
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
