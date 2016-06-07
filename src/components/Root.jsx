import React from 'react'
import Charts from './representational/Charts'
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
