"use strict";

import React from 'react'

import LifeCycleCharts from './application/life_cycle_charts/life_cycle_charts'

// these dependencies should be where they are actually used and required
// maybe in LifeCycleCharts?
// RE: Yep.
import 'react-widgets/lib/less/react-widgets.less'
import '../styles/react-datetime.css'

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
