/**
 * Created by GodofKim on 2016. 8. 19..
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {IMAGE_URL} from './profile';

class ProfileOther extends Component {
  componentWillMount() {
    this.props.fetchProfileOther(this.props.params.id);
  }

  renderImages() {
    if(this.props.profile){
      return this.props.profile.image.map((image) => {
        var url = `${IMAGE_URL}/${image}`;
        return (
          <img src={url} height="250" key={image}/>
        );
      });
    }
  }

  renderProfile() {
    if(this.props.profile) {
      var profile = this.props.profile;
      return (
        <div>
          <h3>{profile.name}</h3>
          <h4>{profile.nickname}</h4>
          <hr/>
          <h5>{profile.school} - {profile.major}</h5>
          <button className="btn btn-primary">쪽지 보내기</button>
          <button className="btn btn-primary">연락처 보내기</button>
        </div>
      );
    }
  }

  render(){
    return (
      <div>
        <h1>Profile</h1>
        {this.renderImages()}
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
