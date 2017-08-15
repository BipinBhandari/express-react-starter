import {takeLatest} from "redux-saga/effects"
import {apiSaga} from "../../common/sagas"
import {browserHistory} from 'react-router'
import {invoiceDetailLoaded, invoiceListLoaded, getInvoiceList as getInvoiceListAction} from "./components/actions"


function* addInvoice({data}) {

  yield apiSaga('/api/invoice', {
      method: 'post',
      body: JSON.stringify(data)
    },
    [
      response => ({type: 'INVOICE_ADDED'}),
      getInvoiceListAction
    ],
    [
      response => ({
        type: '',
        messages: Array.isArray(response) ? response : [response]
      })
    ],
    [
      response => {
        browserHistory.push('/invoice')
        console.log("invoice added", response)
      }
    ]
  )
}

function* editInvoice({invoiceId, data}) {

  yield apiSaga(`/api/invoice/${invoiceId}`, {
      method: 'put',
      body: JSON.stringify(data)
    },
    [
      response => ({type: 'INVOICE_EDITED'}),
      getInvoiceListAction
    ],
    [
      response => ({
        type: '',
        messages: Array.isArray(response) ? response : [response]
      })
    ],
    [
      response => {
        browserHistory.push('/invoice')
        console.log("invoice edited", response)
      }
    ]
  )
}

function* deleteInvoice({id}) {

  yield apiSaga(`/api/invoice/${id}`, {
      method: 'delete',
    },
    [
      response => ({type: 'INVOICE_DELETED'}),
      getInvoiceListAction
    ],
    [
      response => ({
        type: '',
        messages: Array.isArray(response) ? response : [response]
      })
    ],
    [
      response => {
        browserHistory.push('/invoice')
        console.log("invoice deleted", response)
      }
    ]
  )
}


function* getInvoiceList() {

  yield apiSaga('/api/invoice', {
      method: 'get',
    },
    [
      response => invoiceListLoaded(response)
    ],
    [
      response => ({
        type: '',
        messages: Array.isArray(response) ? response : [response]
      })
    ],
    [
      response => {
        console.log("invoice list loaded", response)
      }
    ]
  )
}

function* getInvoice({id}) {

  yield apiSaga(`/api/invoice/${id}`, {
      method: 'get',
    },
    [
      response => invoiceDetailLoaded(response)
    ],
    [
      response => ({
        type: '',
        messages: Array.isArray(response) ? response : [response]
      })
    ],
    [
      response => {
        console.log("invoice detail loaded", response)
      }
    ]
  )
}


export default [
  takeLatest('GET_INVOICE_LIST', getInvoiceList),
  takeLatest('GET_INVOICE', getInvoice),
  takeLatest('ADD_INVOICE', addInvoice),
  takeLatest('EDIT_INVOICE', editInvoice),
  takeLatest('DELETE_INVOICE', deleteInvoice)
]
