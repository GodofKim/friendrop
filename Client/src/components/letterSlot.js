import React, { Component } from 'react';
import { Link } from 'react-router';

class LetterSlot extends Component {
  constructor(props){
    super(props);

    this.state = {
      isHidden : true
    };

    this.toggleContendHide = this.toggleContendHide.bind(this);
  }

  toggleContendHide() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  render() {
    var letter = this.props.letter;
    var profilePath = '/profile/'+ letter.email;
    return(
      <div>
        <li className="list-group-item">
          <h3>{letter.nickname}</h3>
          <h5>{letter.name}</h5>
          <p>{this.state.isHidden? null : letter.content}</p>
          <p>{new Date(letter.date).getFullYear()}-{new Date(letter.date).getMonth()}
            -{new Date(letter.date).getDate()}</p>
          <button className="btn btn-primary" onClick={this.toggleContendHide}>내용 보기</button>
          <Link className="btn btn-primary" to={profilePath}>프로필 보기</Link>
        </li>
      </div>
    );
  }
}

export default LetterSlot;
