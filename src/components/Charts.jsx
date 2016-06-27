"use strict";

import React from 'react';

import ChartWithHeader from './ChartWithHeader';

const DIV_STYLE = {overflow: "auto", maxHeight: "100vh"};

class Charts extends React.Component {
    render() {
        var charts = [];
        if (this.props.selectedVersions !== undefined && this.props.dataSets !== undefined) {
            const {selectedVersions, dataSets, onDelete, viewPortDateRange, ...otherProps} = this.props;

            for (let i = 0; i < selectedVersions.length; i++) {
                const versionId = selectedVersions[i].value;
                const versionTitle = selectedVersions[i].text;

                charts.push(
                    <ChartWithHeader
                        key = {"key" + i}
                        title = {versionTitle}
                        dataSet = {dataSets.get(versionId)}
                        onDelete = {onDelete}
                        viewPortDateRange = {viewPortDateRange}
                        versionId = {versionId}
                        {...otherProps}
                    />
                );
            }
        }

        if (charts.length == 0) {
            return null;
        } else {
            return (
                <div style = {DIV_STYLE}>
                    {charts}
                </div>
            );
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
