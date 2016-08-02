import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';


class TodayDrop extends Component {
  componentWillMount() {
    this.props.fetchDrops();
  }

  componentDidMount() {
  //  setInterval(this.props.fetchDrops, 2000);
  }

  renderSlots() {
    if(this.props.drops){
      return this.props.drops.map((drop) => {
        return (
          <li className="list-group-item" key={drop._id}>
            <h3>{drop.nickname}</h3>
            <p>{drop.name}</p>
            <p>{drop.gender}</p>
            <p>{drop.school} {drop.major}</p>
          </li>
        );
      });
    }
  }

  render(){
    return (
      <div>
        <h1>오늘의 드랍</h1>
        <ul className="list-group">
        {this.renderSlots()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps (state){
  return { drops: state.auth.drops};
}

//이거 끝에를 꼭 바꿔줘야 함.
export default connect(mapStateToProps, actions)(TodayDrop);
