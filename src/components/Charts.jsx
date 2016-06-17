"use strict";

import React from 'react';

import ChartWithHeader from './ChartWithHeader';

class Charts extends React.Component {
    render() {
        var charts = [];
        if (this.props.selectedVersions !== undefined && this.props.dataSets !== undefined) {
            let {selectedVersions, dataSets, onDelete, viewPortDateRange, ...otherProps} = this.props;

            for (let i = 0; i < selectedVersions.length; i++) {
                if (!dataSets.get(selectedVersions[i].value)) {
                    continue;
                };

                // i think for versions only a string is sufficient
                let versionId = selectedVersions[i].value;
                let versionTitle = selectedVersions[i].text;

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
