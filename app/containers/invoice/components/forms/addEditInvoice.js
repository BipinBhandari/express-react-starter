import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Button} from "reactstrap"
const validate = values => {
  const errors = {}
  if (!values.number) {
    errors.number = 'Required'
  }
  if (!values.items || !values.items.length) {
    errors.items = {_error: 'At least one item must be entered'}
  } else {
    const itemArrayErrors = []
    values.items.forEach((item, memberIndex) => {
      const itemErrors = {}
      if (!item || !item.name) {
        itemErrors.name = 'Required'
      }

      if (!item || !item.rate) {
        itemErrors.rate = 'Required'
      }
      if (!item || !item.quantity) {
        itemErrors.quantity = 'Required'
      }

      itemArrayErrors[memberIndex] = itemErrors

      if (itemArrayErrors.length) {
        errors.items = itemArrayErrors
      }
    })
  }
  return errors
}
const renderField = ({input, label, type, meta: {touched, error}}) => (
  <div>
    <div>
      <input {...input} type={type} placeholder={label}
             className="form-control"
      />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
)


const renderItems = ({fields, meta: {touched, error, submitFailed}}) => (
  <div>
    <label htmlFor="email">Items</label>
    <div>
      <a href="#" onClick={() => fields.push({})} className="btn btn-sm btn-primary">
          <span
            className="glyphicon glyphicon-plus"/> Add new Item</a>
    </div>
    {(touched || submitFailed) && error && <span>{error}</span>}
    <ul>
      {fields.map((member, index) => (
        <li key={index}>
          <label>Item #{index + 1}</label>
          <div>
            <div
              className="form-group">
              <Field
                name={`${member}.name`}
                component={renderField}
                type="text"
                label="Item Name"
              />
            </div>

            <div
              className="form-group">
              <Field
                name={`${member}.rate`}
                type="number"
                component={renderField}
                label="Rate"
              />
            </div>

            <div
              className="form-group">
              <Field
                name={`${member}.quantity`}
                type="number"
                component={renderField}
                label="Quantity"
              />
            </div>
          </div>
          <Button
            onClick={() => fields.remove(index)}
          >Remove Item</Button>
        </li>
      ))}
    </ul>
  </div>
)

const AddEditInvoiceForm = props => {
  const {handleSubmit, pristine, reset, submitting} = props
  return (
    <form onSubmit={handleSubmit}>
      <div
        className="form-group">
        <Field
          name="number"
          className="form-control"
          type="number"
          component={renderField}
          label="Number"
        />
      </div>


      <FieldArray name="items" component={renderItems}/>
      <div>

      </div>
      <div>
        <button className="btn btn-sm btn-primary" type="submit" disabled={submitting}>Submit</button>
        <button className="btn btn-sm btn-warning" type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'invoice', // a unique identifier for this form
  validate,
})(AddEditInvoiceForm)

