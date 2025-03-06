import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'

class LoginForm extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickLoginButton = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const options = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        username: '',
        password: '',
        showErrorMsg: false,
      })
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 3, path: '/'})
      history.replace('/')
    } else {
      this.setState({showErrorMsg: true, errorMsg: data.error_msg})
    }
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, showErrorMsg, errorMsg} = this.state
    return (
      <div className="login-form-bg-container">
        <form
          onSubmit={this.onClickLoginButton}
          className="login-form-card-container"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="input-container">
            <label className="username-label" htmlFor="username">
              USERNAME
            </label>
            <input
              id="username"
              type="input"
              onChange={this.onChangeUsername}
              value={username}
              placeholder="Username"
              className="username-input-element"
            />
            <label className="username-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              onChange={this.onChangePassword}
              value={password}
              placeholder="Password"
              className="username-input-element"
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}
export default LoginForm
