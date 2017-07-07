import React, { Component } from 'react';
import Upload from './upload/upload';
import './app.css';
import './user/firebase';
import FirebaseUI from './user/firebaseUI';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      user: null
    };
  }

  signing(sign) {
    this.setState({
      signedIn: sign
    });
  }

  userData(user) {
    this.setState({
      user: user
    });
  }

  render() {
    return (
      <div>
        <FirebaseUI signing={this.signing.bind(this)} userData={this.userData.bind(this)} />
        {this.state.signedIn &&
          this.state.user &&
          <div>
            <div className="text-center">
              <h2>Boom, do your thing</h2>
            </div>
            <Upload />
          </div>}
      </div>
    );
  }
}
