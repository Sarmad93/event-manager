// @flow

import React, { Component } from 'react';
import type { BaseReduxPropTypes } from '../../types/base-props-types';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { userLogin } from '../../actions';
import { Redirect, Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Container } from 'reactstrap';
import './Login.css';

type Props = BaseReduxPropTypes & {
  userState: Object,
  appState: Object,
  events: Object,
};

type State = {
  error: string,
};

class Login extends Component<Props, State> {
  constructor() {
    super();
    this.state = { error: '' };
  }
  login = async e => {
    e.preventDefault();
    const { username, password } = e.target.elements,
      { dispatch } = this.props,
      payload = {
        username: username.value,
        password: password.value,
      };
    // admin / 1299459ML
    const response = await dispatch(userLogin(payload));
    if (response && response.non_field_errors)
      this.setState({ error: response.non_field_errors[0] });
  };

  render() {
    console.log(this.props);
    return this.props.userState.token === null ? (
      <Container className="login-container">
        <h4>Login</h4>
        <LoginForm onSubmit={this.login} />
        <p className="error-message">{this.state.error}</p>
        <Link className="forgot" to="/forgot-password">
          Forgot Password?
        </Link>
        <hr />
        <p className="centralized">
          Not registered yet? <Link to="/signup"> Sign Up </Link>
        </p>
      </Container>
    ) : (
      <Redirect to={{ pathname: '/' }} />
    );
  }
}

const mapStateToProps = state => {
  const { userState } = state;
  return {
    userState,
  };
};

export default connect(mapStateToProps)(Login);
