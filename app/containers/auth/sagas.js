/**
 * Created by sushant on 8/14/17.
 */
import {takeLatest} from "redux-saga/effects"
import {apiSaga} from "../../common/sagas"
import cookie from "react-cookie"
import moment from "moment"
import {browserHistory} from 'react-router'


function* login({data}) {

  yield apiSaga('/api/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    },
    [
      response => ({type: 'LOGIN_SUCCESS', token: response.token, user: response.user}),
    ],
    [
      response => ({
        type: 'LOGIN_FAILURE',
        messages: Array.isArray(response) ? response : [response]
      })
    ],
    [
      response => {
        cookie.save('token', response.token, {expires: moment().add(1, 'hour').toDate()})
        browserHistory.push('/invoice')
      }
    ]
  )
}


export default [
  takeLatest('START_LOGIN', login)
]
