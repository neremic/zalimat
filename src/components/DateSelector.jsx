"use strict";

import React from 'react'

import moment from 'moment';

import Button from 'react-bootstrap/lib/Button';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default () => {
    return <DateField
        dateFormat="YYYY-MM-DD"
    />
}
class DateSelector extends React.Component {
    constructor(props) {
        super(props);

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleDatePicked = this.handleDatePicked.bind(this);
        this.isValidDate = this.isValidDate.bind(this);

        this.state = {openDatePicker : false}
    }

    handleButtonClick(e) {
        e.preventDefault();
        this.setState({openDatePicker : !this.state.openDatePicker});
    }

    handleDatePicked(e, day) {
        if (!this.isValidDate(day)) {
            this.setState({openDatePicker: false});
            this.props.datePicked(day);
        }
    }

    isValidDate(currentDate) {
        let now = moment();
        let diff = now.diff(currentDate, 'days');
        return diff < 0;
    }

    render() {
        let dateFieldComponent = null;
        if (this.state.openDatePicker) {
            dateFieldComponent =
                <DayPicker
                    onDayClick = {this.handleDatePicked}
                    disabledDays = {this.isValidDate}
                />
        }
        return (
            <div>
                <Button
                    bsStyle = "primary" bsSize="xsmall"
                    onClick = {this.handleButtonClick}>
                    {this.props.title}
                </Button>
                {dateFieldComponent}
            </div>
        )
    }

}


DateSelector.propTypes = {
    title: React.PropTypes.string,
    datePicked: React.PropTypes.func.isRequired
};

export default DateSelector;
