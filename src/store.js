// Combine and import all reducers
import createRootReducer from './reducers'

import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { routerMiddleware } from 'connected-react-router'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'

// Initialize store and persistor for local storage
export default history => {
  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['time', 'resources'], // Whitelist reducers
  }

  const rootReducer = createRootReducer(history) // root reducer with router state
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  let store = createStore(
    persistedReducer,
    composeWithDevTools(
      // use 'compose' instead of 'composeWithDevTools' in production
      applyMiddleware(routerMiddleware(history), promiseMiddleware(), thunk),
    ),
  )

  let persistor = persistStore(store)

  return { store, persistor }
}
