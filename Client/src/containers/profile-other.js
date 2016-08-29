/**
 * Created by GodofKim on 2016. 8. 19..
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {IMAGE_URL} from './profile';

class ProfileOther extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLetterFormOpened : false,
      letterContent : ''
    };

    this.toggleLetterForm = this.toggleLetterForm.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendLetter = this.sendLetter.bind(this);
    this.sendContact = this.sendContact.bind(this);
  }

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


  toggleLetterForm(){
    this.setState({
      isLetterFormOpened: !this.state.isLetterFormOpened
    });

    console.log(this.state.isLetterFormOpened);
  }

  handleKeyPress(e) {
    if(e.charCode==13) {
      this.sendLetter();
    }
  }

  handleChange(e) {
    this.setState({
      letterContent: e.target.value
    });
  }

  sendLetter(){
    let temp = {
      content: this.state.letterContent,
      receiver: this.props.params.id
    };

    this.props.sendLetter(temp);

    this.setState({
      letterContent: ''
    });
  }

  sendContact(){
    let temp = { receiver: this.props.params.id };

    this.props.sendContact(temp);
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
          <button className="btn btn-primary" onClick={this.toggleLetterForm}>쪽지 보내기</button>
          <button className="btn btn-primary" onClick={this.sendContact}>연락처 보내기</button>
        </div>
      );
    }
  }

  render(){
    const letterForm = (
      <var className="letter-form">
        <label>쪽지</label>
        <input type="text" name="content" onChange={this.handleChange} onKeyPress={this.handleKeyPress}
               value={this.state.letterContent}/>
        <button onClick={this.sendLetter} >Send</button>
        <button onClick={this.toggleLetterForm}>Cancel</button>
      </var>
    );

    return (
      <div>
        <h1>Profile</h1>
        {this.renderImages()}
        <hr/>
        {this.renderProfile()}
        {this.state.isLetterFormOpened? letterForm: null}
      </div>
    );
  }
}

function mapStateToProps (state){
  return { profile: state.data.profileOther};
}

//이거 끝에를 꼭 바꿔줘야 함.
export default connect(mapStateToProps, actions)(ProfileOther);
