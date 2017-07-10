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
    // Iterate through given dinner IDs
    for (let id in user.hasDinners) {
      // Get the data for this particular dinner
      firebase.database().ref('dinners/' + id).on(
        'value',
        function(snapshot) {
          // Push into our state array, adding ID as we go
          //console.log(snapshot.val());
          let dinners = that.state.dinners,
            dinner = snapshot.val();
          dinner.id = id;
          dinners.push(dinner);
          that.setState({ dinners: dinners });
        },
        function(errorObject) {
          console.log('The read failed: ' + errorObject.code);
        }
      );
    }
  }

  render() {
    if (!this.state.dinners.length) {
      return <p>You have no saved dinners.</p>;
    }
    return (
      <div>
        <h2>My Dinners</h2>
        <div className="dinners">
          {this.state.dinners.map((item, i) => <Dinner key={i} dinner={item} />)}
        </div>
      </div>
    );
  }
}

dinners.propTypes = {};

dinners.defaultProps = {};

export default dinners;
