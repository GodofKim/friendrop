import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import ProfileImageUpload from './profile-image-upload';

export const IMAGE_URL = 'https://s3.ap-northeast-2.amazonaws.com/friendrop';

class Profile extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }

  renderImages() {
    if(this.props.profile){
      // 나중에 image를 객체로 만들어야겠구나.
      // 이미지 이름뿐만 아니라 정보도 저장해야하니. 추가한 날짜같은.

      // image가 비어있으면 자동으로 그냥 안 하네.
      return this.props.profile.image.map((image) => {
        var url = `${IMAGE_URL}/${image}`;
        return (
          <img src={url} height="250" key={image}/>
        );
      });
    }
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
        {this.renderImages()}
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
