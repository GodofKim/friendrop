import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Logout extends Component {
  componentWillMount() {
    this.props.logoutUser();
  }
  render() {
    return <div>Sorry to see you go...여기가 광고같은 거 하기 좋은 곳.</div>;
  }
}


export default connect(null,actions)(Logout);
