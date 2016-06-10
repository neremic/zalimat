"use strict";

import React from 'react'

import LifeCycleCharts from './application/life_cycle_charts/life_cycle_charts'

import 'react-widgets/lib/less/react-widgets.less'
import '../styles/react-datetime.css'

class Root extends React.Component {
    render() {
        return (
            <div>
                <LifeCycleCharts></LifeCycleCharts>
            </div>
        )
    }
}

export default Root;
