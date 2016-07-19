"use strict";

import React from 'react';

import TitleWithButton from '../pure/TitleWithButton';
import SelectableLabelList from '../pure/SelectableLabelList';
import LoadingIf from '../hoc/LoadingIf'
import Hideable from '../hoc/Hideable'
import { AreaChart } from 'react-d3-components';
import ScatterChart from '../pure/ScatterChartRD3';

const MARGINS = {top: 10, bottom: 50, left: 50, right: 20};
const CHART_INTERPOLATION = 'step-after';
const OUTER_STYLE = {display: "flex", marginBottom: 10};
const SIDE_STYLE = {display: "flex", flexDirection: "column", width: 150};
const MIDDLE_STYLE = {display: "flex", flexDirection: "column", flex: "auto"};

class Chart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {selectedElements: new Set()};

        this.WrappedAreaChart = Hideable(AreaChart);
        this.WrappedScatterChart = Hideable(ScatterChart);

        this.elementSelected = this.elementSelected.bind(this);
        this.getEventDataByEventNames = this.getEventDataByEventNames.bind(this);
    }

    elementSelected(selectedElement) {
        const { selectedElements } = this.state;
        if (selectedElements.has(selectedElement)) {
            selectedElements.delete(selectedElement);
        } else {
            selectedElements.add(selectedElement);
        }
        this.setState({selectedElements : selectedElements});
    }

    getEventDataByEventNames() {
        return this.props.eventData.filter(d => this.state.selectedElements.has(d.name));
    }

    render() {
        const { version } = this.props;
        const filteredEventData = this.getEventDataByEventNames();

        let childrenWithProps = [];
        const childWithProps = React.Children.map(this.props.children,
            (child, index) => {
                let clonedChild = React.cloneElement(child, {
                    key: `${applicationId}${versionId}${index}`,
                    applicationId: this.props.applicationId,
                    versionId: version.value
                });
                childrenWithProps.push(clonedChild);
            }
        );

        return (
            <div style={OUTER_STYLE}>
                <div style={SIDE_STYLE}>
                    <div>
                        <TitleWithButton
                            title   = {version.text}
                            onClick = {this.props.onDelete}
                        />
                    </div>
                    <div>
                        <SelectableLabelList
                            elements         = {this.props.eventData}
                            selectedElements = {this.state.selectedElements}
                            select           = {this.elementSelected}
                            colors           = {this.props.labelColors}
                        />
                    </div>
                </div>
                <div style={MIDDLE_STYLE}>
                    <this.WrappedAreaChart
                        initialShow = {true}
                        data        = {this.props.dataSet}
                        xScale      = {this.props.xScale}
                        interpolate = {CHART_INTERPOLATION}
                        height      = {this.props.chartHeight}
                        margin      = {MARGINS}
                        width       = {this.props.chartWidth}
                    />
                    <this.WrappedScatterChart
                        viewPortDateRange = {this.props.viewPortDateRange}
                        data              = {filteredEventData}
                        height            = {this.props.chartHeight}
                        width             = {this.props.chartWidth}
                        colors            = {this.props.plotColors}
                    />
                </div>
                <div style={SIDE_STYLE}>
                    {childrenWithProps}
                </div>
            </div>
        )
    }
}

const dataPending = function(props) {
    return props.dataSet == undefined || props.dataSet.values.length == 0;
};

const loadingAwareChart = LoadingIf(Chart, dataPending);

Chart.PropTypes = {
    version: React.PropTypes.shape({
        text: React.PropTypes.string,
        value: React.PropTypes.string}).isRequired,
    dataSet: React.PropTypes.shape({
        label: React.PropTypes.string,
        values: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                x: React.PropTypes.instanceOf(Date),
                y: React.PropTypes.number})
            )
        }).isRequired,
    eventData: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            name: React.PropTypes.string,
            values: React.PropTypes.arrayOf(
                React.PropTypes.shape({
                    x: React.PropTypes.instanceOf(Date),
                    y: React.PropTypes.number})
            )
        })).isRequired,
    onDelete: React.PropTypes.func.isRequired,
    viewPortDateRange: React.PropTypes.shape({
        startDate: React.PropTypes.instanceOf(Date),
        endDate: React.PropTypes.instanceOf(Date)
    }).isRequired,
    xScale: React.PropTypes.func.isRequired,
    labelColors: React.PropTypes.func.isRequired,
    plotColors: React.PropTypes.func.isRequired,
    chartHeight: React.PropTypes.number,
    chartWidth: React.PropTypes.number,
    applicationId: React.PropTypes.string
};

export {
    Chart as default,
    loadingAwareChart as LoadingAwareChart
};

