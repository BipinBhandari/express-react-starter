export const addInvoice = (data) => ({
  type: 'ADD_INVOICE',
  data
})

export const editInvoice = (invoiceId, data) => ({
  type: 'EDIT_INVOICE',
  invoiceId,
  data
})

export const getInvoice = id => ({
  type: 'GET_INVOICE',
  id
})

export const deleteInvoice= id => ({
  type: 'DELETE_INVOICE',
  id
})

export const getInvoiceList = () => ({
  type: 'GET_INVOICE_LIST'
})

export const invoiceListLoaded = (data) => ({
  type: 'INVOICE_LIST_LOADED',
  data
})

export const invoiceDetailLoaded = (data) => ({
  type: 'INVOICE_DETAIL_LOADED',
  data
})
