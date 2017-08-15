/**
 * Created by sushant on 8/15/17.
 */
import R from "ramda"
import authSagas from "./containers/auth/sagas"
import invoiceSagas from "./containers/invoice/sagas"
import {all} from 'redux-saga/effects'


const sagaList = [
  authSagas,
  invoiceSagas
]

export default function*() {
  const sagas = R.compose(
    all,
    R.flatten
  )(sagaList)
  yield sagas
}





