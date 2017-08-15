const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const R = require('ramda');

const InvoiceSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    number: {
        type: String,
        required: true,
    },
    grandTotal: {
        type: Number,
        required: true
    },
    items: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
        },
        rate: {
            type: Number,
            required: true,
        }
    }],
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

InvoiceSchema.pre('validate', function (next) {
    const invoice = this;

    invoice.grandTotal = R.compose(
        R.sum,
        R.map(R.converge(R.multiply, [R.view(R.lensProp('rate')), R.view(R.lensProp('quantity'))]))
    )(invoice.items)

    next();
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice;
