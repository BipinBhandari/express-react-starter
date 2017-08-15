import {createSelector} from "reselect"

const invoiceDomain = state => state.invoice

export const selectInvoices = createSelector(invoiceDomain, invoiceState => invoiceState.invoiceList)

export const selectInvoiceDetail = createSelector(invoiceDomain, invoiceState => invoiceState.invoiceDetail)

