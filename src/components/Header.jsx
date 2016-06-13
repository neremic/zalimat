"use strict";

import React from 'react';

class Header extends React.Component {

    render() {
        return (
            <div>
                <h1>
                    {this.props.title + "a"}
                </h1>
                <h1>
                    {this.props.title + "b"}
                </h1>
            </div>
        )
    }
}

export default Header;
