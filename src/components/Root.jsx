"use strict";

import React from 'react'

import LifeCycleCharts from './application/life_cycle_charts/life_cycle_charts'

class Root extends React.Component {
    render() {
        return (
            <div>
                <LifeCycleCharts />
            </div>
        )
    }
}

export default Root;
