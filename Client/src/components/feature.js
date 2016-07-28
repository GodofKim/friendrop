import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
//1차적으로는 클라이언트 사이드에서 authenticated 되어있는지 아닌지 확인해서 들어올 수 있는지 없는지 정한다.
//근데 그건 코드 조작으로 뚫을 수 있으니 서버 사이드 인증도 필요.
//컨텐츠는 서버사이드에서 가져온다. 즉 페이지에 들어올 순 있어도 서버를 뚫지 못하면 컨텐츠는 안 보임.
//애초에 페이지 접근까지 서버에서 인증하면 안 되냐? 하면...음. 페이지 로딩 조금이라도 빠르게 하기 위해서인가. 아직 모르겠군. 
class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }
  render(){
    return (
      <div>{this.props.message}</div>
    );
  }
}

function mapStateToProps (state){
  return { message: state.auth.message};
}

export default connect(mapStateToProps, actions)(Feature);
