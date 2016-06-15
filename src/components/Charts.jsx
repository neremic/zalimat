"use strict";

import React from 'react';

import ChartWithHeader from './ChartWithHeader';

class Charts extends React.Component {
    render() {
        var charts = [];
        if (this.props.selectedVersions !== undefined && this.props.dataSets !== undefined) {
            for (let i = 0; i < this.props.selectedVersions.length; i++) {
                if (!this.props.dataSets.get(this.props.selectedVersions[i].text)) {
                    continue;
                }
                charts.push(
                    <ChartWithHeader
                        key = {"key" + i}
                        title = {this.props.selectedVersions[i].text}
                        dataSet = {this.props.dataSets.get(this.props.selectedVersions[i].text)}
                        onDelete = {this.props.onDelete}
                        viewPortDateRange = {this.props.viewPortDateRange}
                    />
                );
            }
        }

        if (charts.length == 0) {
            return null;
        } else {
            return (<div>{charts}</div>);
        }
    }
}

Charts.propTypes = {
    selectedVersions: React.PropTypes.array,
    dataSets: React.PropTypes.object,
    viewPortDateRange: React.PropTypes.shape({
        startDate: React.PropTypes.object,
        endDate: React.PropTypes.object
    }),
    onDelete: React.PropTypes.func
};

export default Charts;
