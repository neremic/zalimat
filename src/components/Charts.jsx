"use strict";

import React from 'react';

import Immutable from 'immutable';

import ChartWithHeader from './ChartWithHeader';

const DIV_STYLE = {overflow: "auto", maxHeight: "100vh"};

class Charts extends React.Component {
    render() {
        let charts = [];
        if (this.props.selectedVersions !== undefined && this.props.dataSets !== undefined) {
            const {selectedVersions, dataSets, ...otherProps} = this.props;

            for (let i = 0; i < selectedVersions.length; i++) {
                const versionId = selectedVersions[i].value;
                if (!dataSets.has(versionId)) {
                    continue;
                }

                charts.push(
                    <ChartWithHeader
                        key = {"key" + i}
                        title = {versionId}
                        versionId = {versionId}
                        dataSet = {dataSets.get(versionId)}
                        {...otherProps}
                    />
                );
            }
        }

        return (charts.length == 0) ? null : <div style = {DIV_STYLE}>{charts}</div>;
    }
}

Charts.propTypes = {
    selectedVersions: React.PropTypes.arrayOf(React.PropTypes.shape({
        text: React.PropTypes.string,
        value: React.PropTypes.string
    })).isRequired,
    dataSets: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    viewPortDateRange: React.PropTypes.shape({
        startDate: React.PropTypes.instanceOf(Date),
        endDate: React.PropTypes.instanceOf(Date)
    }).isRequired,
    onDelete: React.PropTypes.func.isRequired
};

export default Charts;
