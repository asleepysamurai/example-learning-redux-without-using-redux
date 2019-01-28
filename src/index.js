/**
 * Twitter Clone Example Entry Point
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './view/App';
import { store } from './state/store';

render(
    (
        <Provider
            store={store} >
            <App />
        </Provider>
    ),
    document.getElementById('root')
);
