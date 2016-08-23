import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import * as actions from '../actions';
import request from 'superagent';
import { ROOT_URL } from '../actions/index';

class ProfileImageUpload extends Component {



  onDrop(files) {
    console.log('Received files: ', files);

    var image = new FormData();
    image.append('image', files[0]);


    request.post(`${ROOT_URL}/profile-image`)
      .send(image)
      .set({'authorization': localStorage.getItem('token')})
      .end((err, res) => {
        if (err) { console.error(err); }
        console.log(res.text);

        //이미지 업로드 성공 응답 => 프로필 다시 가져옴.
        this.props.fetchProfile();
        return res;
      });
  }

  handleFormSubmit(formProps) {
    this.props.uploadProfileImage(formProps);
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

    return (
      <div>
        <Dropzone onDrop={this.onDrop.bind(this)} multiple={false}>
          <div>사진을 드랍하거나 이곳을 누르세요.</div>
        </Dropzone>

      </div>
    );
  }
}

export default connect(null, actions)(ProfileImageUpload);