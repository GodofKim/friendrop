/**
 * Created by GodofKim on 2016. 8. 19..
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ProfileOther extends Component {
  componentWillMount() {
    this.props.fetchProfileOther(this.props.params.id);
    console.log(this.props.params.id);
  }

  renderProfile() {
    //if () 해서 내용물이 있는지 없는지 꼭!! 반드시!! 확인해야한다 에러나지 않도록
    if(this.props.profile) {
      console.log(profile);
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
        <img src="https://goo.gl/O6e1TB" width="300px"/>
        <hr/>
        {this.renderProfile()}
      </div>

    );
  }
}

function mapStateToProps (state){
  return { profile: state.data.profileOther};
}

//이거 끝에를 꼭 바꿔줘야 함.
export default connect(mapStateToProps, actions)(ProfileOther);
