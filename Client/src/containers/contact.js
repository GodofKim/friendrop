import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';


class Contact extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }
  render(){
    return (
      <div>
        <h1>연락처</h1>
        <div>연락처 슬롯 쫙.{this.props.message}</div>
      </div>
    );
  }
}

function mapStateToProps (state){
  return { message: state.auth.message};
}

//이거 끝에를 꼭 바꿔줘야 함.
export default connect(mapStateToProps, actions)(Contact);
