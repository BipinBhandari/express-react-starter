import {combineReducers} from "redux"
import messages from "./messages"
import auth from "../containers/auth/reducer"
import invoice from "../containers/invoice/reducer"
import {reducer as reduxFormReducer} from "redux-form"


export default combineReducers({
  messages,
  auth,
  form: reduxFormReducer,
  invoice
})
