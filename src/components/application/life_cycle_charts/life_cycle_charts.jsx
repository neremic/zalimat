"use strict";

import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash'

import * as versionHistoryActions from '../../../actions/applicationHistoryAction';

import moment from 'moment';

import {Test} from '../../Test';
import DimensionTest from '../../DimensionTest';
import Charts from '../../Charts';
import GlobalBrush from '../../GlobalBrush';
import VersionSelector from '../../VersionSelector'
import DateSelector from '../../DateSelector'

import 'react-widgets/lib/less/react-widgets.less'
import '../../../styles/react-datetime.css'

const BRUSH_HEIGHT = 50;
const CHART_HEIGHT = 200;
const DATE_FORMAT = 'Do [of] MMM YYYY';

class LifeCycleCharts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            applicationId : 'kio',
            versionToBeRemoved : undefined,
            versions : [],
            selectedVerions : [],
            viewPortDateRange : {
                startDate : moment().subtract(1, "days").startOf('day').toDate(),
                endDate : moment().endOf('day').toDate()
            },
            brushViewPortDateRange : {
                startDate : moment().subtract(1, "days").startOf('day').toDate(),
                endDate : moment().endOf('day').toDate()
            }
        };

        this.handleStartDatePicked = this.handleStartDatePicked.bind(this);
        this.handleEndDatePicked = this.handleEndDatePicked.bind(this);
        this.handleVersionSelected = this.handleVersionSelected.bind(this);
        this.handleBrushChanged = this.handleBrushChanged.bind(this);
        this.handleVersionRemoved = this.handleVersionRemoved.bind(this);
    }

    handleBrushChanged(start, end) {
        this.setState({
            viewPortDateRange : {
                startDate : start,
                endDate : end
            }
        });
    }

    handleVersionSelected(selectedOptions) {
        const addedVersions = _.difference(selectedOptions, this.state.selectedVerions);
        this.loadVersionHistory(
            this.state.applicationId,
            addedVersions,
            this.state.viewPortDateRange.startDate,
            this.state.viewPortDateRange.endDate
        );
        this.setState({ selectedVerions : selectedOptions });
    }

    handleVersionRemoved(versionToBeRemoved) {
        const newValues = this.state.selectedVerions.filter((v) => {
            return v.value != versionToBeRemoved;
        });

        if (newValues.length < this.state.selectedVerions.length) {
            this.setState({
                versionToBeRemoved: versionToBeRemoved,
                selectedVerions: newValues
            });
        }
    }

    loadVersionHistory(applicationId, versions, startDate, endDate) {
        this.props.actions.loadVersionHistories(
            applicationId,
            versions,
            startDate,
            endDate
        );
    }

    handleDateChanged(startDate, endDate) {
        this.loadVersionHistory(
            this.state.applicationId,
            this.state.selectedVerions,
            startDate,
            endDate
        );

        this.setState({
            viewPortDateRange : {
                startDate : startDate,
                endDate : endDate
            },
            brushViewPortDateRange : {
                startDate : startDate,
                endDate : endDate
            }
        });
    }

    handleStartDatePicked(date) {
        this.handleDateChanged(date, this.state.viewPortDateRange.endDate);
    }

    handleEndDatePicked(date) {
        this.handleDateChanged(this.state.viewPortDateRange.startDate, date);
    }

    render() {
        const {startDate, endDate} = this.state.viewPortDateRange;
        return (
            <div style={{padding: "40px"}}>
                <div style={{display: "flex"}}>
                    <VersionSelector
                        removeVersion = {this.state.versionToBeRemoved}
                        versions = {this.props.versions}
                        onChange = {this.handleVersionSelected}
                        isLoading = {this.props.ajaxStatus.versionsCallsPending > 0}
                    />
                </div>
                <hr />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h3>
                        {moment(this.state.viewPortDateRange.startDate).format(DATE_FORMAT)}
                    </h3>
                    <h3>
                        {moment(this.state.viewPortDateRange.endDate).format(DATE_FORMAT)}
                    </h3>
                </div>
                <div style={{display: "flex", justifyContent: "flex-center"}}>
                    <DateSelector
                        datePicked = {this.handleStartDatePicked}
                        title = 'Select Start Date'
                    />
                    <div style = {{flex: "auto"}}>
                        <GlobalBrush
                            show = {true}
                            onBrushChange = {this.handleBrushChanged}
                            viewPortDateRange = {this.state.brushViewPortDateRange}
                            height = {BRUSH_HEIGHT}
                        />
                    </div>
                    <DateSelector
                        datePicked = {this.handleEndDatePicked}
                        title = 'Select End Date'
                    />
                </div>
                <hr />
                <div style={{display: "flex", justifyContent: "flex-center"}}>
                    <div style = {{flex: "auto"}}>
                        <Charts
                            selectedVersions = {this.state.selectedVerions}
                            onDelete = {this.handleVersionRemoved}
                            dataSets = {this.props.versionsHistory}
                            viewPortDateRange = {this.state.viewPortDateRange}
                            applicationId = {this.state.applicationId}
                            height = {CHART_HEIGHT}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        versions : state.applicationVersionReducer,
        versionsHistory : state.applicationVersionHistoryReducer,
        ajaxStatus : state.ajaxStatusReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(versionHistoryActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LifeCycleCharts);
