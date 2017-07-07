import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

var authUi = new firebaseui.auth.AuthUI(firebase.auth());

export default class FirebaseUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      user: null
    };
  }

  componentDidMount() {
    var that = this;
    var uiConfig = {
      callbacks: {
        signInSuccess: function(user) {
          that.setState({
            signedIn: true,
            user: user
          });
          that.props.signing(true);
          that.props.userData(user);

          that.dbSaveUser(user);
        }
      },
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    authUi.start('#firebaseui-auth', uiConfig);
  }

  componentWillUnmount() {
    authUi.reset();
  }

  signOut() {
    authUi.reset();
    this.setState({ signedIn: false });
    this.props.signing(false);
  }

  dbSaveUser(user) {
    let userInfo = {
      email: user.email ? user.email : null,
      displayName: user.displayName ? user.displayName : null
    };
    // Overrides any data given, which is cool for us
    firebase.database().ref('users/' + user.uid).set(userInfo);
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
              Welcome {this.state.user.displayName} (uid: {this.state.user.uid})
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
