import React from "react"
import {connect} from "react-redux"
import {login} from "./actions"
import LoginForm from "./components/forms/login"
import Messages from "../../components/Messages"

class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  handleLogin = (data) => {
    this.props.login(data)
  }

  render() {
    return (
      <div className="login-container container">
        <Messages messages={this.props.messages}/>
        <LoginForm onSubmit={this.handleLogin}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
}

export default connect(
  mapStateToProps,
  {login}
)(Login)
