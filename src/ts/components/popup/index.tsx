import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import PopupApp from './PopupApp';
import { PersistGate } from 'redux-persist/integration/react';
import storage from '../../background/index';

const store = new Store({
    portName: 'ExPort' // Communication port between the background component and views such as browser tabs.
})

store.ready().then(() => {
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={"Loading"} persistor={storage.persistor}>
                <PopupApp />
            </PersistGate>
        </Provider>
        , document.getElementById('popup-root'))
});
