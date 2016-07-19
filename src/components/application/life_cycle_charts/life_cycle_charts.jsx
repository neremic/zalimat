"use strict";

import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash'

import * as versionHistoryActions from '../../../actions/applicationHistoryAction';

import moment from 'moment';

import PropsExposer from '../../hoc/PropsExposer'
import Charts from '../../functional/Charts'
import GlobalBrush from '../../functional/GlobalBrush';
import VersionSelector from '../../functional/VersionSelector'
import DateSelector from '../../functional/DateSelector'
import 'react-widgets/lib/less/react-widgets.less'
import '../../../styles/react-datetime.css'
import 'react-date-picker/index.css'
import Dimensions from 'react-dimensions'

const BRUSH_HEIGHT = 50;
const CHART_HEIGHT = 200;
const DATE_FORMAT = 'Do [of] MMM YYYY';
const MARGINS = {top: 10, bottom: 50, left: 50, right: 20};
const CHART_HORIZONTAL_MARGINS = MARGINS.left + MARGINS.right;

const SIDE_STYLE = {width: '150px'};
const MIDDLE_STYLE = {flex: "auto"};
const OUTER_STYLE = {padding: "40px"};

class LifeCycleCharts extends React.Component {
    constructor(props) {
        super(props);

        this.testData = [{name: 'RunInstance', count: 3},
            {name: 'TerminateInstance', count: 3},
            {name: 'StartInstance', count: 5},
            {name: 'StopInstance', count: 3},
            {name: 'GiveLoveAChance', count: 6},
            {name: 'event1', count: 3},
            {name: 'event2', count: 1},
            {name: 'event3', count: 3}];

        this.state = {
            chartWidth : 400,
            applicationId : 'kio',
            versionToBeRemoved : undefined,
            versions : [],
            selectedVerions : [],
            zoomedViewPortDateRange : {
                startDate : moment().subtract(1, "days").startOf('day').toDate(),
                endDate : moment().endOf('day').toDate()
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
        this.widthChangeCallback = this.widthChangeCallback.bind(this);

    }

    widthChangeCallback(props) {
        const newWidth = props.containerWidth;
        if (this.state.chartWidth != newWidth) {
            this.setState({
                chartWidth: newWidth
            });
        }
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
        const WrappedPropsExposer = Dimensions()(PropsExposer(() => (<div />), this.widthChangeCallback));
        const {startDate, endDate} = this.state.zoomedViewPortDateRange;

        return (
            <div style = {OUTER_STYLE}>
                <div style = {{display: "flex"}}>
                    <VersionSelector
                        removeVersion = {this.state.versionToBeRemoved}
                        versions      = {this.props.versions}
                        onChange      = {this.handleVersionSelected}
                        isLoading     = {this.props.ajaxStatus.versionsCallsPending > 0}
                    />
                </div>
                <hr />
                <div style = {{display: "flex", justifyContent: "space-between"}}>
                    <h3>
                        {moment(this.state.totalViewPortDateRange.startDate).format(DATE_FORMAT)}
                    </h3>
                    <div style = {{flex: "auto"}}>
                        <WrappedPropsExposer />
                    </div>
                    <h3>
                        {moment(this.state.totalViewPortDateRange.endDate).format(DATE_FORMAT)}
                    </h3>
                </div>
                <div style = {{display: "flex", justifyContent: "flex-center"}}>
                    <div style = {SIDE_STYLE}>
                        <DateSelector
                            datePicked   = {this.handleStartDatePicked}
                            title        = 'Select Start Date'
                            defaultValue = {this.state.totalViewPortDateRange.startDate}
                            maxDate      = {this.state.totalViewPortDateRange.endDate}
                        />
                    </div>
                    <div style = {MIDDLE_STYLE}>
                        <GlobalBrush
                            show              = {true}
                            onBrushChange     = {this.handleBrushChanged}
                            viewPortDateRange = {this.state.totalViewPortDateRange}
                            height            = {BRUSH_HEIGHT}
                        />
                    </div>
                    <div style = {SIDE_STYLE}>
                        <DateSelector
                            datePicked   = {this.handleEndDatePicked}
                            title        = 'Select Start Date'
                            align        = 'right'
                            defaultValue = {this.state.totalViewPortDateRange.endDate}
                            minDate      = {this.state.totalViewPortDateRange.startDate}
                            maxDate      = {moment().endOf('day').toDate()}
                        />
                    </div>
                </div>
                <hr />
                <Charts
                    xScale            = {d3.time.scale().domain([startDate, endDate]).range([0, this.state.chartWidth - CHART_HORIZONTAL_MARGINS])}
                    versions          = {this.state.selectedVerions}
                    dataSets          = {this.props.versionsHistory}
                    onDelete          = {this.handleVersionRemoved}
                    chartWidth        = {this.state.chartWidth}
                    viewPortDateRange = {this.state.zoomedViewPortDateRange}
                    applicationId     = {this.state.applicationId}
                    chartHeight       = {CHART_HEIGHT}
                />
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
