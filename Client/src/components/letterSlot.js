import React, { Component } from 'react';

class LetterSlot extends Component {
  render() {
    var letter = this.props.letter;

    return(
      <li className="list-group-item">
        <h3>{letter.nickname}</h3>
        <h5>{letter.name}</h5>
        <p>{letter.content}</p>
        <p>{new Date(letter.date).getFullYear()}-{new Date(letter.date).getMonth()}
          -{new Date(letter.date).getDate()}</p>
      </li>
    );
  }
}

export default LetterSlot;
