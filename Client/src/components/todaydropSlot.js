import React, { Component } from 'react';

class TodayDropSlot extends Component {
  render() {
    return(
      <li className="list-group-item">
        <h3>{this.props.drop.nickname}</h3>
        <p>{this.props.drop.name}</p>
        <p>{this.props.drop.gender}</p>
        <p>{this.props.drop.school} {this.props.drop.major}</p>
      </li>
    );
  }
}

export default TodayDropSlot;
