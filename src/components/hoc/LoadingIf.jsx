"use strict";

import React from 'react';

const UPDATE_MS = 500;
const MAX_DOTS = 3;

var LoadingIf = (Wrapped, loadingCondition) => class LoadingIf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dots: '',
            loading: loadingCondition(props)
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            let currentDots = this.state.dots + '.';
            if (currentDots.length > MAX_DOTS) {
                currentDots = ''
            }
            this.setState({
                dots: currentDots
            });
        }, UPDATE_MS);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentWillReceiveProps(nextProps) {
        if (!loadingCondition(nextProps)) {
            this.setState({
                loading: false
            });
            clearInterval(this.interval);
        } else if (!this.state.loading) {
            this.setState({
                loading: true
            });
            this.componentDidMount();
        }
    }

    render() {
        const {loading, dots} = this.state;

        return (
            <div style={{display: "flex", flexDirection: "column"}}>
                {loading ?
                    <h1>
                        Loading{dots}
                    </h1> :
                    <Wrapped {...this.props} />
                }
            </div>
        )
    }
};

LoadingIf.PropTypes = {
    loadingCondition: React.PropTypes.func.isRequired
}

export default LoadingIf;
