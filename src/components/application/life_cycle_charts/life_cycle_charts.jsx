"use strict";

import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash'

import * as versionHistoryActions from '../../../actions/applicationHistoryAction';

import moment from 'moment';

import Charts from '../../Charts';
import GlobalBrush from '../../GlobalBrush';
import VersionSelector from '../../VersionSelector'
import DateSelector2 from '../../DateSelector2'

import 'react-widgets/lib/less/react-widgets.less'
import '../../../styles/react-datetime.css'
import 'react-date-picker/index.css'

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
            zoomedViewPortDateRange : {
                startDate : moment().subtract(1, "days").startOf('day').toDate(),
                endDate : moment().startOf('day').toDate()
            },
            totalViewPortDateRange : {
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
            zoomedViewPortDateRange : {
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
            this.state.zoomedViewPortDateRange.startDate,
            this.state.zoomedViewPortDateRange.endDate
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
            zoomedViewPortDateRange : {
                startDate : startDate,
                endDate : endDate
            },
            totalViewPortDateRange : {
                startDate : startDate,
                endDate : endDate
            }
        });
    }

    handleStartDatePicked(date) {
        this.handleDateChanged(moment(date).startOf('day').toDate(), this.state.totalViewPortDateRange.endDate);
    }

    handleEndDatePicked(date) {
        this.handleDateChanged(this.state.totalViewPortDateRange.startDate, moment(date).endOf('day').toDate());
    }

    render() {
        const {startDate, endDate} = this.state.zoomedViewPortDateRange;
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
                        {moment(this.state.totalViewPortDateRange.startDate).format(DATE_FORMAT)}
                    </h3>
                    <h3>
                        {moment(this.state.totalViewPortDateRange.endDate).format(DATE_FORMAT)}
                    </h3>
                </div>
                <div style={{display: "flex", justifyContent: "flex-center"}}>
                    <DateSelector2
                        datePicked = {this.handleStartDatePicked}
                        title = 'Select Start Date'
                        defaultValue = {this.state.totalViewPortDateRange.startDate}
                        maxDate = {this.state.totalViewPortDateRange.endDate}
                    />
                    <div style = {{flex: "auto"}}>
                        <GlobalBrush
                            show = {true}
                            onBrushChange = {this.handleBrushChanged}
                            viewPortDateRange = {this.state.totalViewPortDateRange}
                            height = {BRUSH_HEIGHT}
                        />
                    </div>
                    <div style={{width: '100px'}}>
                        <DateSelector2
                            datePicked = {this.handleEndDatePicked}
                            title = 'Select Start Date'
                            align = 'right'
                            defaultValue = {this.state.totalViewPortDateRange.endDate}
                            minDate = {this.state.totalViewPortDateRange.startDate}
                            maxDate = {moment().endOf('day').toDate()}
                        />
                    </div>
                </div>
                <hr />
                <div style={{display: "flex", justifyContent: "flex-center"}}>
                    <div style = {{flex: "auto"}}>
                        <Charts
                            selectedVersions = {this.state.selectedVerions}
                            onDelete = {this.handleVersionRemoved}
                            dataSets = {this.props.versionsHistory}
                            viewPortDateRange = {this.state.zoomedViewPortDateRange}
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
