import React, { Component } from 'react';

class TodayDropSlot extends Component {
  render() {
    var drop = this.props.drop;

    return(
      <li className="list-group-item">
        <h3>{drop.nickname}</h3>
        <p>{drop.name}</p>
        <p>{drop.gender}</p>
        <p>{drop.school} {drop.major}</p>
        <p>{new Date(drop.date).getFullYear()}-{new Date(drop.date).getMonth()}
          -{new Date(drop.date).getDate()}</p>
      </li>
    );
  }
}

export default TodayDropSlot;
