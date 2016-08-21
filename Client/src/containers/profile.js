import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import ProfileImageUpload from './profile-image-upload';

class Profile extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }

  renderProfile() {
    //if () 해서 내용물이 있는지 없는지 꼭!! 반드시!! 확인해야한다 에러나지 않도록
    if(this.props.profile) {
      var profile = this.props.profile;
      return (
        <div>
          <h3>{profile.name}</h3>
          <h4>{profile.nickname}</h4>
          <hr/>
          <h5>{profile.school} - {profile.major}</h5>
    
        </div>
      );
    }
  }
  render(){
    return (
      <div>
        <h1>Profile</h1>
        <hr/>
        <div className="profile-image">
          <ProfileImageUpload/>
        </div>
        <hr/>
        {this.renderProfile()}
        <Link className="btn btn-primary" to="/profile-edit">Edit</Link>
        <Link className="btn btn-danger" to="/user-remove">계정 삭제</Link>
      </div>

    );
  }
}

function mapStateToProps (state){
  return { profile: state.auth.profile};
}

//이거 끝에를 꼭 바꿔줘야 함.
export default connect(mapStateToProps, actions)(Profile);
