// @flow

import React from 'react';
import { Input, Button } from 'reactstrap';
import './LoginForm.css';
import { Field, reduxForm } from 'redux-form';
import renderField from '../RenderField';
import validate from './LoginValidator';

type Props = {
  onSubmit(e: any): void,
};

let LoginForm = (props: Props) => {
  const { valid, onSubmit } = props;
  console.log(props);
  return (
    <form id="login-form" onSubmit={onSubmit}>
      <Field
        type="text"
        placeholder="User Name"
        className="form-control"
        name="username"
        component={renderField}
      />

      <Field
        type="password"
        placeholder="Password"
        className="form-control"
        name="password"
        component={renderField}
      />

      <input
        type="submit"
        className="btn btn-primary"
        disabled={!valid}
        value="Sign in"
      />
    </form>
  );
};

LoginForm = reduxForm({
  form: 'login',
  validate,
})(LoginForm);

export default LoginForm;
