/**
 * Created by sushant on 8/15/17.
 */
import React from "react"
import {createStructuredSelector} from "reselect"
import {connect} from "react-redux"
import {selectInvoices} from "./selectors"
import {Button, Container, Table} from "reactstrap"
import {Link} from "react-router"
import {deleteInvoice, getInvoiceList} from "./components/actions"
import {selectUser} from "../auth/selectors"

class Invoice extends React.Component {
  componentWillMount() {
    this.props.getInvoiceList()
  }

  handleDelete = item => {
    const result = confirm("Are you sure you want to delete this invoice?")
    if (result) {
      this.props.deleteInvoice(item._id)
    }
  }

  checkIfAdmin = () => {
    const {user} = this.props
    return user && (user.role === 'ADMIN')
  }

  render() {
    const {invoices} = this.props

    return (<Container>
      <Link to={'invoice/add'}><Button>Create</Button></Link>

      {
        !invoices.length &&
        <div style={{
          textAlign: 'center',
          marginTop: "50px"
        }}>
          <h5>
            No invoices. Click "create" button to add new invoice.
          </h5>
        </div>
      }
      {
        invoices.length > 0 ? <Table>
          <thead>
          <tr>
            <th>Invoice Number</th>
            <th></th>
            <th>Created By</th>
            <th>Grand Total</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {
            invoices.map(invoice => <tr key={invoice._id}>
              <th scope="row">
                {invoice.number}
              </th>
              <th>
                {
                  `${invoice.items.length} items`
                }
              </th>

              <th>
                {
                  invoice.createdBy.name
                }
              </th>

              <th>
                Rs. {invoice.grandTotal}
              </th>
              <th>
                <Link to={`/invoice/edit/${invoice._id}`}><Button>Edit</Button></Link>
                {
                  this.checkIfAdmin() &&
                  <Button onClick={() => this.handleDelete(invoice)}>Delete</Button>
                }
              </th>
            </tr>)
          }
          </tbody>
        </Table>
          : null
      }</Container>)
  }
}

const mapStateToProps = createStructuredSelector({
  invoices: selectInvoices,
  user: selectUser
})

export default connect(mapStateToProps, {getInvoiceList, deleteInvoice})(Invoice)

