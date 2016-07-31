import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class Header extends Component {
  renderLinks(){
    if(this.props.authenticated){
      //show a link to sign out
      return [
          <li className="nav-item" key={1}>
            <Link className="nav-link" to="/profile">프로필</Link>
          </li>,
          <li className="nav-item" key={2}>
            <Link className="nav-link" to="/todaydrop">오늘의 드랍</Link>
          </li>,
          <li className="nav-item" key={3}>
            <Link className="nav-link" to="/letter">쪽지</Link>
          </li>,
          <li className="nav-item" key={4}>
            <Link className="nav-link" to="/contact">연락처</Link>
          </li>,
          <li className="nav-item" key={5}>
            <Link className="nav-link" to="/logout">로그아웃</Link>
          </li>
      ];
    }else {
      //show a link to log in or sign up
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/login">로그인</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">가입하기</Link>
        </li>
      ];
    }
  }
  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Friendrop</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return  {
    authenticated: state.auth.authenticated
  };
}
export default connect (mapStateToProps) (Header);