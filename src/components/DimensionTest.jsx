"use strict";
import React from 'react'
import Dimensions from 'react-dimensions'

class DimensionTest extends React.Component {
    componentWillReceiveProps(nextProps) {
        console.log("my componentWillReceiveProps are %O", nextProps);
    }

    render() {
        return (
            <div>
                DimensionTest
                containerW={this.props.containerWidth}
                containerHeight={this.props.containerHeight}
            </div>
        )
    }
}

export default Dimensions()(DimensionTest);
