import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';


class Letter extends Component {
  componentWillMount() {
    this.props.fetchLetters();
  }

  renderSlots() {
    if(this.props.letters){
      return this.props.letters.map((letter) => {
        return (
          <li className="list-group-item" key={letter._id}>
            <h3>{letter.nickname}</h3>
            <h5>{letter.name}</h5>
            <p>{letter.content}</p>
          </li>
        );
      });
    }
  }

  render(){
    return (
      <div>
        <h1>쪽지</h1>
        <ul className="list-group">
          {this.renderSlots()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps (state){
  return { letters: state.auth.letters};
}

//이거 끝에를 꼭 바꿔줘야 함.
export default connect(mapStateToProps, actions)(Letter);
