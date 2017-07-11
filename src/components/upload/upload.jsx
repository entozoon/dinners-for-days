import React from 'react';
import firebase from 'firebase';
import Video from '../video/video';
import Concepts from '../concepts/concepts';

const Clarifai = require('clarifai');

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoTaken: false,
      error: null,
      width: 0,
      height: 0,
      concepts: [],
      name: '',
      dinnerRef: null,
      dinnerId: null,
      userData: null
    };
  }

  /**
   * convertVideoToImageData
   * Convert the video stream from camera into an image (via a canvas)
   */
  convertVideoToImageData(data) {
    this.video = document.getElementById('video');
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.photo = document.getElementById('photo');

    // Create image on the canvas
    this.canvas.width = this.state.width;
    this.canvas.height = this.state.height;
    this.context.drawImage(this.video, 0, 0, this.state.width, this.state.height);
    return this.canvas.toDataURL('image/png');
  }

  /**
   * takePhoto
   */
  takePhoto() {
    let data = this.convertVideoToImageData();

    // Upload base64 image data
    this.uploadPhotoToDatabase(data).then(id => {
      //alert('Boom, image uploaded with id: ' + id);

      this.setHasDinnerForUser(id);
    });

    // Brap it in an <img> element as a preview
    this.photo.setAttribute('src', data);

    this.imageRecognition(data);

    this.setState({ photoTaken: true });

    // Add class to body, as the <video> element for camera is outside of the app
    document.body.classList.add('photo-taken');
  }

  // Add dinner id to user's hasDinners array
  setHasDinnerForUser(id) {
    firebase.database().ref('users/' + this.props.user.uid + '/hasDinners/' + id).set(true);
  }

  /**
   * uploadPhotoToDatabase
   * Push a new item to 'dinners/' and set the image data in place.
   */
  uploadPhotoToDatabase(data) {
    return new Promise((resolve, reject) => {
      // Database structure, rough concept:
      // (Nice and flat as retrieving a data node fetches all child data too and it'll have images)
      //
      // Users:
      //   ye78way87eywaue20: (unique ID key)
      //     name: 'entozoon'
      //     email: 'entozoon@gmail.com'
      //     hasDinners: [timestampId1]
      //
      // Dinners:
      //   timestampId1: (push generated key)
      //     name: 'fish and chips'
      //     rating: 4.5
      //     image: 'data:image/png;base64,iVBORw0KGgoAAA'
      //     date: 2017-03-05 12:00pm
      //   timestampId2:
      //     name: 'fish and pips'
      //     rating: 0.5
      //     image: 'data:image/png;base64,iVBORw0KGgoAAB'
      //     date: 2017-03-05 12:10pm
      //     notes: 'who on earth likes pips?!'
      //

      let dinnersRef = firebase.database().ref('dinners/');
      dinnersRef.push().then(snapshot => {
        const id = snapshot.key;
        this.setState({
          dinnerRef: snapshot,
          dinnerId: id
        });
        snapshot.set({
          image: data
        });
        resolve(id);
      });
    });
  }

  imageRecognition(data) {
    const clarifaiApp = new Clarifai.App({
      apiKey: 'aa4d7f9d292a4590a702f007e23b1384'
    });

    // Strip the base64 prefix
    data = data.substr('data:image/png;base64,'.length);

    let that = this; // are we having fun yet?

    clarifaiApp.models
      .predict(
        'bd367be194cf45149e75f01d59f77ba7', // Clarifai.FOOD_MODEL ?
        // 'https://samples.clarifai.com/food.jpg' // Remote url can be passed here, alternatively
        { base64: data }
      )
      .then(
        function(response) {
          // Whip out the basic 'concept' item names from the response into a state
          let concepts = response.outputs[0].data.concepts.map(item => {
            return item.name;
          });
          that.setState({ concepts: concepts });
        },
        function(error) {
          console.log('Clarifai error: ');
          console.log(error);
        }
      );
  }

  /**
   * nameChange
   * Updating the name of a dinner using the input updates the database
   */
  changeName(event) {
    this.state.dinnerRef.update({
      name: event.target.value
    });
  }

  /**
   * videoUpdated
   * Store video stream dimensions for whatever nefarious purposes I devise
   */
  videoUpdated(size) {
    this.setState({
      width: size.width,
      height: size.height
    });
  }

  render() {
    let errorHtml = '';
    if (this.state.error !== null) {
      if (this.state.error === 'DevicesNotFoundError') {
        errorHtml = 'Your device doesn\'t appear to have a usable camera! \n';
      } else {
        errorHtml = 'To err is human \n';
      }
      errorHtml += '[' + this.state.error + ']';
    }

    return (
      <div className="upload">
        {errorHtml
          ? <div>
              {errorHtml}
            </div>
          : ''}

        <Video updated={this.videoUpdated.bind(this)} />

        <canvas id="canvas" className="photo photo--canvas" />

        <img id="photo" className="photo photo--img" alt="" />
        {!errorHtml && this.state.width !== 0 && !this.state.photoTaken
          ? <button className="btn--photo" onClick={this.takePhoto.bind(this)} />
          : ''}

        {this.state.dinnerRef ? <input onChange={this.changeName.bind(this)} /> : ''}

        {this.state.concepts.length ? <Concepts concepts={this.state.concepts} /> : ''}
      </div>
    );
  }
}
