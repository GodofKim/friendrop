import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';


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
          <h5>{profile.school} {profile.major}</h5>
    
        </div>
      );
    }
  }
  render(){
    return (
      <div>
        <h1>Profile</h1>
        <h2>먼저 이곳에 사진들을 올릴 것이고</h2>
        <div>이 아래엔 프로필 목록 쫙.</div>
        {this.renderProfile()}
      </div>
    );
  }
}

function mapStateToProps (state){
  return { profile: state.auth.profile};
}

//이거 끝에를 꼭 바꿔줘야 함.
export default connect(mapStateToProps, actions)(Profile);
