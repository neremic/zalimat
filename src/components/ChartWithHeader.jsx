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

        // this is a bit weird, you can just bind when you're using it
        // RE: I follow the guidence from official docs for react.
        // There it is stated
        // "We recommend that you bind your event handlers in the constructor so they are only bound once for every instance:"
        this.handleDeleteThisChart = this.handleDeleteThisChart.bind(this);
    }

    handleDeleteThisChart() {
        this.props.onDelete(this.props.versionId);
    }

    render() {
        let {title, dataSet, viewPortDateRange, applicationId, versionId, children} = this.props;

        let childrenWithProps = [];
        const childWithProps = React.Children.map(this.props.children,
            (child, index) => {
                let clonedChild = React.cloneElement(child, {
                    // use string interpolation to make clear that these are not numbers
                    // eg `${applicationId}${versionId}${index}`
                    // RE: Will do so. Just happend to stumple of string interpolation - or templating as it is called -
                    // as of last weekend :)
                    key: applicationId + versionId + index,
                    applicationId: applicationId,
                    versionId: versionId
                });
                childrenWithProps.push(clonedChild);
            }
        );

        return (
            <Row className="show-grid">
                <Col md={12}>
                    <Panel>
                        <hr/>
                        <h2>
                            <Label bsStyle="success">
                                {title}
                            </Label>
                        </h2>
                        <Button
                            bsStyle="danger" bsSize="xsmall"
                            onClick = {this.handleDeleteThisChart}>
                            X
                        </Button>
                        <AutoWidth className="responsive">
                            <Chart
                                dataSet = {dataSet}
                                viewPortDateRange = {viewPortDateRange}
                            />
                        </AutoWidth>
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
