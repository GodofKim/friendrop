import React, { Component } from 'react';

class TodayDropCard extends Component {
  render() {
    return(
      <li className="list-group-item">
        <h3>{props.drop.nickname}</h3>
        <p>{props.drop.name}</p>
        <p>{props.drop.gender}</p>
        <p>{props.drop.school} {props.drop.major}</p>
      </li>
    );
  }
}

export default TodayDropCard;
