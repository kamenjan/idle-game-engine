import React from 'react'
import TextField from 'material-ui/TextField';

const LoginPanel = props => {

  let {
    submitForm,
    inProgress,
    changeUsername,
    changePassword,
    username,
    password
  } = props

  return(
    <div>
      <form onSubmit={submitForm(username, password)}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="username"
              placeholder="Username"
              value={username}
              onChange={changeUsername} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="Password"
              value={password}
              onChange={changePassword} />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={inProgress}>
            Sign in
          </button>

        </fieldset>
      </form>
    </div>
  )
}

export default LoginPanel