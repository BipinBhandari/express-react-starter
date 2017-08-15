import React from "react"
import {IndexRoute, Route} from "react-router"
import App from "./components/App"
import Home from "./components/Home"
import NotFound from "./components/NotFound"
import Login from "./containers/auth/login"
import AddInvoice from "./containers/invoice/addInvoice"
import EditInvoice from "./containers/invoice/editInvoice"
import InvoiceList from "./containers/invoice"

export default function getRoutes(store) {
  const ensureAuthenticated = (nextState, replace) => {
    if (!store.getState().auth.token) {
      replace('/login')
    }
  }
  const skipIfAuthenticated = (nextState, replace) => {
    if (store.getState().auth.token) {
      replace('/invoice')
    }
  }
  const clearMessages = () => {
    store.dispatch({
      type: 'CLEAR_MESSAGES'
    })
  }
  return (
    <Route path="/" component={App} >
      <IndexRoute component={Home} onLeave={clearMessages} onEnter={skipIfAuthenticated}/>
      <Route path="/login" component={Login} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path='/invoice' component={InvoiceList} onEnter={ensureAuthenticated}/>
      <Route path='/invoice/add' component={AddInvoice} onEnter={ensureAuthenticated}/>
      <Route path='/invoice/edit/:id' component={EditInvoice} onEnter={ensureAuthenticated}/>
      <Route path="*" component={NotFound} onLeave={clearMessages}/>
    </Route>
  )
}
