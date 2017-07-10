import React, { Component } from 'react';
import Header from './components/header/header';
import Upload from './components/upload/upload';
import Dinners from './components/dinners/dinners';
import './app.css';

import './components/user/firebase';
import User from './components/user/user';

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
  receivedUserData(user) {
    this.setState({
      user: user
    });
  }

  render() {
    return (
      <div>
        {!this.state.signedIn && <Header />}

        {this.state.signedIn && <Upload user={this.state.user} />}

        <User
          signing={this.signing.bind(this)}
          receivedUserData={this.receivedUserData.bind(this)}
        />
        {this.state.signedIn &&
          <div>
            <div className="text-center">
              <h2>Boom, do your thing</h2>
            </div>

            <Dinners user={this.state.user} />
          </div>}
      </div>
    );
  }
}
