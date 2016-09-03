import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { browserHistory } from 'react-router';

class Login extends Component {

  componentWillMount(){
    if(this.props.authenticated){
      browserHistory.push('/todaydrop');
    }
  }

  handleFormSubmit({email, password}){
    console.log(email, password);
    // Need to do something to log user in.
    this.props.loginUser({email,password});
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    //fields를 field로 쓰기만 해도 아예 안 되는군.
    const { handleSubmit, fields: {email, password}} = this.props;

    return (
      <div>
        <img src="https://s3.ap-northeast-2.amazonaws.com/friendrop/UI/friendrop-brand.png" width="350"/>
        <hr/>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>Email:</label>
            <input {...email}  className="form-control" />
          </fieldset>
          <fieldset className="form-group">
            <label>Password:</label>
            <input {...password}
            type="password"
            className="form-control" />
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Log in</button>
        </form>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated,
    errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'login',
  fields: ['email', 'password']
}, mapStateToProps , actions)(Login);
