/**
 * Created by sushant on 8/15/17.
 */
import React from 'react'
import AddInvoiceForm from './components/forms/addEditInvoice'
import {connect} from "react-redux"
import {createStructuredSelector} from 'reselect'
import {addInvoice} from "./components/actions"

class AddInvoice extends React.Component {

    handleInvoiceSubmit = data => {
        this.props.addInvoice(data)
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3">

                    </div>


                    <div className="col-md-6">
                        <AddInvoiceForm
                            onSubmit={this.handleInvoiceSubmit}/>
                    </div>

                    <div className="col-md-3">

                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = createStructuredSelector({})


export default connect(mapStateToProps, {addInvoice})(AddInvoice)
