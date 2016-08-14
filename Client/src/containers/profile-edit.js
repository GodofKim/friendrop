import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';


class ProfileEdit extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }

  handleFormSubmit(formProps) {
    console.log("handleFormSubmit: WWWWKKWKWK");
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


  render(){
    if(this.props.profile) {
      var profile = this.props.profile;
      const { handleSubmit, fields: {name, nickname, school, major} } = this.props;

      return (
        <div>
          <h1>Profile edit</h1>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className="form-group">
              <label>Name </label>
              <input className="form-control" defaultValue={profile.name} {...name}/>
            </fieldset>
            <fieldset className="form-group">
              <label>Nickname </label>
              <input className="form-control" defaultValue={profile.nickname} {...nickname}/>
            </fieldset>
            <fieldset className="form-group">
              <label>School </label>
              <input className="form-control" defaultValue={profile.school} {...school}/>
            </fieldset>
            <fieldset className="form-group">
              <label>Major </label>
              <input className="form-control" defaultValue={profile.major} {...major}/>
            </fieldset>

            {this.renderAlert()}
            <button type="submit" className="btn btn-primary">Apply</button>
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

function mapStateToProps (state){
  return { profile: state.auth.profile, errorMessage: state.auth.error};
}

export default reduxForm({
  form: 'profile-edit',
  fields: ['name','nickname','school','major']
}, mapStateToProps, actions)(ProfileEdit);