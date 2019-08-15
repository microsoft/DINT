import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';

import { createDomAnchor } from '../../scripts/dom';
import NotificationScript from './NotificationScript';

createDomAnchor('counter-root')

const store = new Store({
    portName: 'ExPort' // Communication port between the background component and views such as browser tabs.
})

console.log('index in contentScript');
store.ready().then(() => {
    ReactDOM.render(
        <Provider store={store}>
            <NotificationScript />
        </Provider>
        , document.getElementById('counter-root'))
});
