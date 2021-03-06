import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      user: null
    };
    // Create the authUi instance with which to log in, out, shake it all about.
    this.authUi = new firebaseui.auth.AuthUI(firebase.auth());
  }

  componentDidMount() {
    var that = this;
    var authUiConfig = {
      callbacks: {
        // Signed in!
        signInSuccess: function(user) {
          // Save user data to database
          that.dbSaveUser(user);

          // Get user dinners and such
          that.getUserContent(user).then(() => {
            // .. Run the passed prop functions in a similar vein
            that.props.signing(true);
            that.props.receivedUserData(user);
          });

          // Set the states for this fact and returned user data here, and..
          that.setState({ signedIn: true, user: user });
        }
      },
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    this.authUi.start('#firebaseui-auth', authUiConfig);
  }

  getUserContent(user) {
    var that = this;
    return new Promise((resolve, reject) => {
      firebase.database().ref('users/' + user.uid).on(
        'value',
        function(snapshot) {
          //console.log(snapshot.val());
          // Add the hasDinners values from db to user data in state
          let user = that.state.user;
          if (snapshot.val()['hasDinners']) {
            user['hasDinners'] = snapshot.val()['hasDinners'];
          }
          that.setState({ user: user });
          resolve();
        },
        function(errorObject) {
          console.log('The read failed: ' + errorObject.code);
        }
      );
    });
  }

  /**
   * signOut
   * Reset the authUI, set local states and similar prop functions
   */
  signOut() {
    this.authUi.reset();
    this.setState({ signedIn: false, user: null });
    this.props.signing(false);
  }

  componentWillUnmount() {
    this.signOut();
  }

  /**
   * dbSaveUser
   * Save a simplified form of the given user data into firebase
   */
  dbSaveUser(user) {
    let userInfo = {
      email: user.email ? user.email : null,
      displayName: user.displayName ? user.displayName : null
    };
    // Overrides any key data given, which is cool for us
    firebase.database().ref('users/' + user.uid).update(userInfo);
  }

  render() {
    return (
      <div>
        {!this.state.signedIn &&
          <div className="text-center">
            <h2>You must log in</h2>
          </div>}
        <div id="firebaseui-auth" />
        {this.state.signedIn &&
          <div className="user__logout">
            <div>
              Welcome, {this.state.user.displayName}!
            </div>
            <div>
              <div onClick={this.signOut.bind(this)} className="btn">
                Log out
              </div>
            </div>
          </div>}
      </div>
    );
  }
}
