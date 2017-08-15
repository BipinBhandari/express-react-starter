const initialState = {
  invoiceList: []
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'INVOICE_LIST_LOADED':
      return {...state, invoiceList: action.data}
    case 'INVOICE_DETAIL_LOADED':
      return {...state, invoiceDetail: action.data}
    default:
      return state
  }
}
