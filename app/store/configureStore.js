import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import 'babel-polyfill'
import createSagaMiddleware from 'redux-saga'
import appSagas from '../sagas'

export default function configureStore(initialState) {
  const logger = createLogger()
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, promise, logger, sagaMiddleware),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  sagaMiddleware.run(appSagas)

  return store
}
