import React from "react"
import {Field, reduxForm} from "redux-form"
import {Button} from "reactstrap"

const LoginForm = props => {
    const {handleSubmit, pristine, submitting} = props
    return (
        <form onSubmit={handleSubmit}>
            <div
                className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                    name="email"
                    className="form-control"
                    component="input"
                    type="email"
                    placeholder="Email"
                />
            </div>
            <div
                className="form-group"
            >
                <label htmlFor="email">Password</label>
                <Field
                    name="password"
                    className="form-control"
                    component="input"
                    type="password"
                    placeholder="Password"
                />
            </div>
            <div>
                <Button type="submit" disabled={pristine || submitting} className="btn btn-success">Login</Button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'login',
})(LoginForm)

