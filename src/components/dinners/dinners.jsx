import React, { Component } from 'react';
import firebase from 'firebase';

class dinners extends Component {
  constructor(props) {
    super(props);
    // Only created after sign in, so should be fine to grab stuff

    this.getDinnersForUser(this.props.user);
  }

  getDinnersForUser(user) {
    console.log('getDinnersForUser()');
    console.log(user);
    console.log('[^ User should contain hasDinners (brought in via firebaseUI class)]');
    console.log('[For each hasDinners as dinner { db.ref(\'dinners/{dinner}\'); }]');
    /*
    firebase.database().ref('dinners').on(
      'value',
      function(snapshot) {
        console.log(snapshot.val());
      },
      function(errorObject) {
        console.log('The read failed: ' + errorObject.code);
      }
    );
    */
  }

  render() {
    return <div className="dinners" />;
  }
}

dinners.propTypes = {};

dinners.defaultProps = {};

export default dinners;
