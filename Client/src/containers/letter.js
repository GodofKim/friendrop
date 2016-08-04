import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import LetterSlot from '../components/letterSlot';

class Letter extends Component {
  componentWillMount() {
    this.props.fetchLetters();
  }

  renderSlots() {
    if(this.props.letters){
      this.props.letters.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });

      return this.props.letters.map((letter) => {
        return (
          <LetterSlot letter={letter} key={letter._id}/>
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
