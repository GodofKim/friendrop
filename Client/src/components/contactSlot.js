/**
 * Created by kjhor on 2016-08-17.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';

class ContactSlot extends Component {
    render() {
      var contact = this.props.contact;
      var profilePath = '/profile/' + contact.email;

      return(
        <li className="list-group-item">
          <h3>{contact.nickname}</h3>
          <h5>{contact.name}</h5>
          <p>{contact.phone}</p>
          <p>{new Date(contact.date).getFullYear()}-{new Date(contact.date).getMonth()}
              -{new Date(contact.date).getDate()}</p>
          <Link className="btn btn-primary" to={profilePath}>프로필 보기</Link>
         </li>
      );
    }
}

export default ContactSlot;
