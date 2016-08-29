/**
 * Created by kjhor on 2016-08-17.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';

class ContactSlot extends Component {
  constructor(props){
    super(props);

    this.state = {
      isHidden : true
    };

    this.toggleContentHide = this.toggleContentHide.bind(this);
  }

  toggleContentHide (){
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

    render() {
      var contact = this.props.contact;
      var profilePath = '/profile/' + contact.email;

      return(
        <li className="list-group-item">
          <h3>{contact.nickname}</h3>
          <h5>{contact.name}</h5>
          <p>{this.state.isHidden? null : contact.phone}</p>
          <p>{new Date(contact.date).getFullYear()}-{new Date(contact.date).getMonth()}
              -{new Date(contact.date).getDate()}</p>
          <button className="btn btn-primary" onClick={this.toggleContentHide}>연락처 보기</button>
          <Link className="btn btn-primary" to={profilePath}>프로필 보기</Link>
         </li>
      );
    }
}

export default ContactSlot;
