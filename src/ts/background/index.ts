import { createStore } from "redux";
import reducers from "./store";
import { wrapStore } from "react-chrome-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
	key: 'root',
	storage,
  }
  
const persistedReducer = persistReducer(persistConfig, reducers)

let store = createStore(persistedReducer)

let persistor = persistStore(store)

wrapStore(store, {
	portName: 'ExPort' // Communication port between the background component and views such as browser tabs.
});
  
export default { store, persistor };

