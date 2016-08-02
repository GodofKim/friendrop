import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';


class Contact extends Component {
  componentWillMount() {
    this.props.fetchContacts();
  }

  renderSlots() {
    if(this.props.contacts){
      return this.props.contacts.map((contact) => {
        return (
          <li className="list-group-item" key={contact._id}>
            <h3>{contact.nickname}</h3>
            <h5>{contact.name}</h5>
            <p>{contact.phone}</p>
          </li>
        );
      });
    }
  }

  render(){
    return (
      <div>
        <h1>연락처</h1>
        <ul className="list-group">
          {this.renderSlots()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps (state){
  return { contacts: state.auth.contacts};
}

//이거 끝에를 꼭 바꿔줘야 함.
export default connect(mapStateToProps, actions)(Contact);
