import firebase from 'firebase';

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
//var ref = firebase.database().ref('/44358340');

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('logged in');
  } else {
    console.log('not logged in');
  }
});
