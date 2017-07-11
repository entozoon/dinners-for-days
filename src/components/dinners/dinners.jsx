import React, { Component } from 'react';
import firebase from 'firebase';
import Dinner from './dinner';

class dinners extends Component {
  constructor(props) {
    super(props);
    // Only created after sign in, so should be fine to grab stuff

    this.state = {
      dinners: []
    };
  }

  componentDidMount() {
    this.getDinnersForUser(this.props.user);
  }

  getDinnersForUser(user) {
    let that = this;

    // // Iterate through given dinner IDs
    // for (let id in user.hasDinners) {
    //   // Get the data for this particular dinner
    //   let dbRef = firebase.database().ref('dinners/' + id);
    //   dbRef.on(
    //     // NB: ref.on() runs again and again whenever the db updates!
    //     'value',
    //     function(snapshot) {
    //       // Push into our state array, adding ID as we go
    //       //console.log(snapshot.val());
    //       let dinners = that.state.dinners,
    //         dinner = snapshot.val();
    //       dinner.id = id;
    //       dinner.dbRef = dbRef;
    //       dinners.push(dinner);
    //       that.setState({ dinners: dinners });
    //     },
    //     function(errorObject) {
    //       console.log('The read failed: ' + errorObject.code);
    //     }
    //   );
    // }

    // Re-writing the above algorithm in a less efficient but more robust way, for now.
    let dbRef = firebase.database().ref('dinners/');
    // Whenever the database is updated:
    dbRef.on('value', snapshot => {
      let dinners = [];
      // Iterate through given dinner IDs
      for (let dinnerId in user.hasDinners) {
        // Grab each dinner from the received snapshot
        let dbRef = firebase.database().ref('dinners/' + dinnerId);
        let dinner = snapshot.child(dinnerId).val();
        // Add some other juicy values
        dinner.id = dinnerId;
        dinner.dbRef = dbRef;
        dinners.push(dinner);
      }
      // Save the array into its state
      that.setState({ dinners: dinners });
    });
  }

  render() {
    if (!this.state.dinners.length) {
      return <p>You have no saved dinners.</p>;
    }

    return (
      <div>
        <h2>My Dinners</h2>
        <div className="dinners">
          {this.state.dinners.map((item, i) =>
            <Dinner key={i} dbRef={item.dbRef} name={item.name} image={item.image} />
          )}
        </div>
      </div>
    );
  }
}

dinners.propTypes = {};

dinners.defaultProps = {};

export default dinners;
