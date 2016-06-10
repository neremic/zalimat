"use strict";

import React from 'react';

import ChartWithHeader from './ChartWithHeader';

class Charts extends React.Component {
    render() {
        var charts = [];
        if (this.props.selectedVersions !== undefined) {
            for (let i = 0; i < this.props.selectedVersions.length; i++) {
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

export default Charts;
