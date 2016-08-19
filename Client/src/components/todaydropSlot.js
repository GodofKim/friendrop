import React, { Component } from 'react';
import { Link } from 'react-router';

class TodayDropSlot extends Component {
  render() {
    var drop = this.props.drop;
    var profilePath = '/profile/' + drop.email;
    return(
      <li className="list-group-item">
        <h3>{drop.nickname}</h3>
        <p>{drop.name}</p>
        <p>{drop.gender}</p>
        <p>{drop.school} {drop.major}</p>
        <p>{new Date(drop.date).getFullYear()}-{new Date(drop.date).getMonth()}
          -{new Date(drop.date).getDate()}</p>
        <Link className="btn btn-primary" to={profilePath}>프로필 보기</Link>
      </li>
    );
  }
}

export default TodayDropSlot;
