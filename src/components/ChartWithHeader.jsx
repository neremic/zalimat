"use strict";

import React from 'react'

import Chart from './Chart.jsx'

import Label from 'react-bootstrap/lib/Label';
import Button from 'react-bootstrap/lib/Button';

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
                <div style = {{flex: "auto"}} key = 'chart-key'>
                    <Chart
                        dataSet = {dataSet}
                        viewPortDateRange = {viewPortDateRange}
                        height = {height}
                    />
                </div>
            );
        }

        return (
            <div style={{display: "flex"}}>
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
            </div>
        )
    }
}

ChartWithHeader.propTypes = {
    title: React.PropTypes.string,
    dataSet: React.PropTypes.shape({
        label: React.PropTypes.string,
        values: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                x: React.PropTypes.instanceOf(Date),
                y: React.PropTypes.number
            })
        )
    }).isRequired,
    viewPortDateRange: React.PropTypes.shape({
        startDate: React.PropTypes.instanceOf(Date),
        endDate: React.PropTypes.instanceOf(Date)
    }).isRequired,
    onDelete: React.PropTypes.func.isRequired
};

export default ChartWithHeader;
