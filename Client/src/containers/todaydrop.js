import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';


class TodayDrop extends Component {
  componentWillMount() {
    this.props.fetchArray();
  }

  componentDidMount() {
    setInterval(this.props.fetchArray, 2000);
  }

  renderSlots() {
    if(this.props.drops){
      return this.props.drops.map((slot) => {
        return (
          <li className="list-group-item" key={slot._id}>
            <h3>{slot.name}</h3>
            <p>{slot.email}</p>
            <p>학교: {slot.detail.school} 학과: {slot.detail.major}</p>
          </li>
        );
      });
    }
  }

  render(){
    return (
      <div>
        <h1>오늘의 드랍</h1>
        <p>오늘의 드랍 슬롯 쫙.</p>
        <ul className="list-group">
        {this.renderSlots()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps (state){
  return { drops: state.auth.array};
}

//이거 끝에를 꼭 바꿔줘야 함.
export default connect(mapStateToProps, actions)(TodayDrop);
