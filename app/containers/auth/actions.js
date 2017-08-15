/**
 * Created by sushant on 8/15/17.
 */

import cookie from "react-cookie"
import {browserHistory} from "react-router"
export const login = (data) => {
  return {
    type: 'START_LOGIN',
    data
  }
}

export function logout() {
  cookie.remove('token')
  setTimeout(() => browserHistory.push('/login'), 500)

  return {
    type: 'LOGOUT_SUCCESS'
  }
}
