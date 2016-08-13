import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    console.log("Signup Class : 이건 되나");
    this.props.signupUser(formProps);
  }

  renderAlert(){
    if (this.props.errorMessage){
      
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: {email, password, passwordConfirm}} = this.props;

    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" {...email} />
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input type="password"  className="form-control" {...password} />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input type="password"  className="form-control" {...passwordConfirm} />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}
// {password.touched && password.error && <div className="error">{password.error}</div>} 1이 트루고 2도 트루고 3도 트루면 마지막인 3을 리턴한다. ??

function validate(formProps) {
  const errors = {};

  //formProps => 말그대로 form 에있는 props인듯 {...email} 이런거
  if (!formProps.email){
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm){
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if(formProps.password != formProps.passwordConfirm){
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}
export default reduxForm({
  form: 'signup',
  fields: ['email','password','passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);
