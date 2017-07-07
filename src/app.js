import React, { Component } from 'react';
import Upload from './components/upload/upload';
import Dinners from './components/dinners/dinners';
import './app.css';

import './components/user/firebase';
import FirebaseUI from './components/user/firebaseUI';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      user: null
    };
  }

  /**
   * signedIn state (app-wide)
   */
  signing(sign) {
    this.setState({
      signedIn: sign
    });
  }

  /**
   * user data state received after sign-in
   */
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

            <Dinners user={this.state.user} />
          </div>}
      </div>
    );
  }
}
