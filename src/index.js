"use strict";

import React from 'react';
import Root from './components/Root.jsx';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {loadApplicationVersions} from './actions/applicationVersionAction'

const store = configureStore();
store.dispatch(loadApplicationVersions());

render(
    <Provider store={store}>
        <Root/>
    </Provider>,
    document.getElementById('app')
);

