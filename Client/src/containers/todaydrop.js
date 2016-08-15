import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TodayDropSlot from '../components/todaydropSlot';

class TodayDrop extends Component {
  componentWillMount() {
    this.props.fetchDrops();
  }

  componentDidMount() {
    //setInterval(this.props.fetchDrops, 2000);
  }

  renderSlots() {
    if(this.props.drops){

      this.props.drops.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });

      return this.props.drops.map((drop) => {
        return (
          <TodayDropSlot drop={drop} key={drop._id}/>

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
