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
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>

      </div>
    );
  }
}

export default connect(null, actions)(ProfileImageUpload);