import React from 'react';
import Immutable from 'immutable';
import { calculateColors, RGBtoHex } from '../util/colorUtils'
import { getMockEvents, getMockEventData } from '../util/mockData'
import { LoadingAwareChart as Chart } from './Chart'

const COLOR_OFFSET = 20;

class Charts extends React.Component {
    constructor(props) {
        super(props);
        this.testData = getMockEvents();
        this.colorsByElement = calculateColors(this.testData.map(e => e.name));
        this.testEventData = getMockEventData(this.testData, props.viewPortDateRange);

        this.getColorByElementNameAsHex = this.getColorByElementNameAsHex.bind(this);
        this.getDimmedColorByElementNameAsHex = this.getDimmedColorByElementNameAsHex.bind(this);
        this.getColorByEventName = this.getColorByEventName.bind(this);
    }

    getColorByElementNameAsHex(elementName) {
        const {r, g, b} = this.colorsByElement.get(elementName);
        return RGBtoHex(r, g, b);
    }

    getDimmedColorByElementNameAsHex(elementName) {
        const {r, g, b} = this.colorsByElement.get(elementName);
        return RGBtoHex(r - COLOR_OFFSET, g - COLOR_OFFSET, b - COLOR_OFFSET);
    }

    getColorByEventName(indexInData) {
        const eventName = this.testEventData[indexInData].name;
        return this.getDimmedColorByElementNameAsHex(eventName);
    }

    render() {
        const charts = this.props.versions.map(version => {
                return <Chart
                    key               = {version.value}
                    version           = {version}
                    dataSet           = {this.props.dataSets.get(version.value)}
                    eventData         = {this.testEventData}
                    onDelete          = {() => this.props.onDelete(version.value)}
                    viewPortDateRange = {this.props.viewPortDateRange}
                    applicationId     = {this.props.applicationId}
                    chartHeight       = {this.props.chartHeight}
                    xScale            = {this.props.xScale}
                    labelColors       = {this.getColorByElementNameAsHex}
                    plotColors        = {this.getColorByEventName}
                    chartWidth        = {this.props.chartWidth}
                />
        });

        if (charts.length > 0) {
            return (
                <div style={{display: "flex", flexDirection: "column", flex: "auto"}}>
                    { charts }
                </div>
            )
        }
        return null;
    }
}

Charts.propTypes = {
    versions: React.PropTypes.arrayOf(React.PropTypes.shape({
        text: React.PropTypes.string,
        value: React.PropTypes.string
    })).isRequired,
    dataSets: React.PropTypes.instanceOf(Immutable.Map).isRequired
}

export default Charts;
