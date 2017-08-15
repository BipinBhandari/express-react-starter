/**
 * Created by sushant on 8/15/17.
 */
import React from "react"
import EditInvoiceForm from "./components/forms/addEditInvoice"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"
import {editInvoice, getInvoice} from "./components/actions"
import {selectInvoiceDetail} from "./selectors"

class AddInvoice extends React.Component {

    componentWillMount() {
        this.props.getInvoice(this.props.params.id)
    }

    handleInvoiceSubmit = data => {
        this.props.editInvoice(this.props.params.id, data)
    }

    render() {
        const {editableInvoice} = this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3">

                    </div>


                    <div className="col-md-6">
                        <EditInvoiceForm
                            onSubmit={this.handleInvoiceSubmit}
                            initialValues={editableInvoice}
                        />
                    </div>

                    <div className="col-md-3">

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    editableInvoice: selectInvoiceDetail
})


export default connect(
    mapStateToProps,
    {editInvoice, getInvoice}
)(AddInvoice)
