/**
 * Created by JihoonKim on 2016. 8. 15..
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class UserRemove extends Component {

  removeUser() {
    this.props.removeUser();
  }

  render(){
    console.log("아니뭐야");
    return (
      <div>
        <h1>계정 삭제</h1>
        <hr/>
        <h3>계정을 제거하시겠습니까? 자신과 관련된 모든 정보가 제거됩니다. (계정 정보, 보낸 드랍, 보낸 쪽지, 보낸 연락처)</h3>
        <button className="btn btn-danger" onClick={this.props.removeUser}>Remove</button>
      </div>
    );
  }
}

//이거 끝에를 꼭 바꿔줘야 함.
export default connect(null, actions)(UserRemove); // 중요 : connect 는 첫번쨰 인자로 mapState를 받는다
