import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ContactSlot from '../components/contactSlot';

class Contact extends Component {
  componentWillMount() {
    this.props.fetchContacts();
  }

  renderSlots() {
    if(this.props.contacts){
      this.props.contacts.sort((a,b) => {
        return new Date(b.date) - new Date(a.date);
      });

      return this.props.contacts.map((contact) => {
        return (
          <ContactSlot contact={contact} key={contact._id}/>
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
