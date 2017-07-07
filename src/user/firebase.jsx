import firebase from 'firebase';

/**
 * Firebase DB connection config
 * No security issues here, as it's not a password situation;
 * Domains are granted access in the Firebase console.
 */
var config = {
  apiKey: 'AIzaSyBcczhOPrrAHtVvkngWW0D2dodSKMTtLSE',
  authDomain: 'dinner-for-days.firebaseapp.com',
  databaseURL: 'https://dinner-for-days.firebaseio.com',
  projectId: 'dinner-for-days',
  storageBucket: '',
  messagingSenderId: '4020578151'
};

// eslint-disable-next-line
var app = firebase.initializeApp(config);

/*
// I don't .. think .. I need to use this callback as FirebaseUI sets a state instead
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('logged in');
  } else {
    console.log('not logged in');
  }
});
*/
