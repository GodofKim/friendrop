import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';


class ProfileEdit extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }

  handleFormSubmit(formProps) {
    this.props.editProfile(formProps);
    console.log("이건 되냐");
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


  render(){
    if(this.props.profile) {
      var profile = this.props.profile;
      const { handleSubmit } = this.props;

      return (
        <div>
          <h1>Profile edit</h1>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className="form-group">
              <label>Name </label>
              <input className="form-control" name="name" defaultValue={profile.name}/>
            </fieldset>
            <fieldset className="form-group">
              <label>Nickname </label>
              <input className="form-control" name="nickname" defaultValue={profile.nickname}/>
            </fieldset>
            <fieldset className="form-group">
              <label>School </label>
              <input className="form-control" name="school" defaultValue={profile.school}/>
            </fieldset>
            <fieldset className="form-group">
              <label>Major </label>
              <input className="form-control" name="major" defaultValue={profile.major}/>
            </fieldset>

            {this.renderAlert()}
            <button action="submit" className="btn btn-primary">Apply</button>
          </form>
        </div>
      );
    } else{
      return (
        <div>Loading...</div>
      );
    }
  }
}

function validate(formProps) {
  const errors = {};

  //formProps => 말그대로 form 에있는 props인듯 {...email} 이런거
  if (!formProps.name){
    errors.name = 'Please enter an email';
  }

  if (!formProps.nickname) {
    errors.nickname = 'Please enter a password';
  }

  if (!formProps.school){
    errors.school = 'Please enter a password confirmation';
  }

  if(formProps.major){
    errors.major = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps (state){
  return { profile: state.auth.profile, errorMessage: state.auth.error};
}

export default reduxForm({
  form: 'profile-edit',
  fields: ['name','nickname','school','major'],
  validate
}, mapStateToProps, actions)(ProfileEdit);