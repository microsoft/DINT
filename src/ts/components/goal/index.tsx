import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import GoalProgress from './GoalProgress';

import { createDomAnchor } from '../../scripts/dom';

createDomAnchor('counter-root')

const store = new Store({
    portName: 'ExPort' // Communication port between the background component and views such as browser tabs.
})

store.ready().then(() => {
    ReactDOM.render(
        <Provider store={store}>
            <GoalProgress/>
        </Provider>
        , document.getElementById('counter-root'))
});