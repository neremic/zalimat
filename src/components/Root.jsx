"use strict";

import React from 'react'
import 'react-widgets/lib/less/react-widgets.less'
import LifeCycleCharts from './application/life_cycle_charts/life_cycle_charts'

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
