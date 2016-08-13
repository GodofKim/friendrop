import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';


class ProfileEdit extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }

  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    this.props.editProfile(formProps);
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

  renderProfileEdit() {
    //if () 해서 내용물이 있는지 없는지 꼭!! 반드시!! 확인해야한다 에러나지 않도록
    if(this.props.profile) {
      var profile = this.props.profile;
      const { handleSubmit } = this.props;

      return (
        <div>
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
    }
  }
  render(){
    return (
      <div>
        <h1>Profile</h1>
        {this.renderProfileEdit()}
      </div>
    );
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
  return { profile: state.auth.profile};
}

export default reduxForm({
  form: 'profile-edit',
  fields: ['name','nickname','school','major'],
  validate
}, mapStateToProps, actions)(ProfileEdit);