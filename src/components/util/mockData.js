"use strict";

import moment from 'moment';

const getMockEvents = function () {
    return [{name: 'RunInstance', count: 3},
        {name: 'TerminateInstance', count: 3},
        {name: 'StartInstance', count: 5},
        {name: 'StopInstance', count: 3},
        {name: 'GiveLoveAChance', count: 6},
        {name: 'event1', count: 3},
        {name: 'event2', count: 1},
        {name: 'event3', count: 3}];
};

const getMockEventData = function (elements, viewPortRange) {
    let {startDate, endDate} = viewPortRange;
    return elements.map(e => {
        let result = {
            name: e.name,
            values: []
        };
        let currentDate = startDate;
        currentDate = moment(currentDate).add(1, 'hours').toDate();
        for (let i = 1; i <= e.count; i++) {
            result.values.push({
                x: currentDate,
                y: Math.floor(10 * Math.random())
            });
            currentDate = moment(currentDate).add(1 + i * 3 * Math.random(), 'hours').toDate();
        }
        return result;
    });
};

export {
    getMockEvents,
    getMockEventData
}
