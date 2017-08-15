/**
 * Created by sushant on 8/15/17.
 */
import {put, call, select} from 'redux-saga/effects'
import {selectToken} from "../containers/auth/selectors"
import R from "ramda"

export const apiSaga = function*(url, params, successActions, failureActions, successCallbacks, errorCallbacks) {
  const token = yield select(selectToken)
  if (token) {
    params.headers = R.merge(params.headers, {Authorization: `JWT ${token}`, 'Content-Type': 'application/json'})
  }
  const response = yield call(fetch, url, params)
  if (response.ok) {
    const responseJson = yield call([response, response.json])
    if (successActions)
      yield successActions.map(successAction => put(successAction(responseJson)))
    if (successCallbacks)
      successCallbacks.forEach(successCallback => successCallback(responseJson))
  } else {
    const responseJson = yield call([response, response.json])
    if (failureActions)
      yield failureActions.map(failureAction => put(failureAction(responseJson)))
    if (errorCallbacks)
      successCallbacks.forEach(errorCallback => errorCallback(responseJson))
  }
}
