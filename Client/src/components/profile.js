import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';


class Profile extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }
  render(){
    return (
      <div>
        <h1>Profile</h1>
        <h2>먼저 이곳에 사진들을 올릴 것이고</h2>
        <div>이 아래엔 프로필 목록 쫙.{this.props.message}</div>
      </div>
    );
  }
}

function mapStateToProps (state){
  return { message: state.auth.message};
}

//이거 끝에를 꼭 바꿔줘야 함. 
export default connect(mapStateToProps, actions)(Profile);
