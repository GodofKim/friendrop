/**
 * Created by kjhor on 2016-08-17.
 */
import React, { Component } from 'react';

class ContactSlot extends Component {
    render() {
        var contact = this.props.contact;

        return(
            <li className="list-group-item">
                <h3>{contact.nickname}</h3>
                <h5>{contact.name}</h5>
                <p>{contact.phone}</p>
                <p>{new Date(contact.date).getFullYear()}-{new Date(contact.date).getMonth()}
                    -{new Date(contact.date).getDate()}</p>
            </li>
        );
    }
}

export default ContactSlot;
