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
      dinnerId: null
    };
  }

  takePhoto() {
    this.video = document.getElementById('video');
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.photo = document.getElementById('photo');

    // Create image on the canvas
    this.canvas.width = this.state.width;
    this.canvas.height = this.state.height;
    this.context.drawImage(this.video, 0, 0, this.state.width, this.state.height);

    // Convert canvas to image data
    let data = this.canvas.toDataURL('image/png');

    this.uploadPhotoToDatabase(data);

    // Brap it in an <img> element for now
    this.photo.setAttribute('src', data);

    this.setState({ photoTaken: true });

    // Add class to body, as the <video> element for camera is outside of the app
    document.body.classList.add('photo-taken');
  }

  uploadPhotoToDatabase(data) {
    // Database structure, rough plan:
    // Nice and flat as retrieving a data node fetches all child data too and it'll have images..
    //
    // Users:
    //   ye78way87eywaue20: (unique ID key)
    //     name: 'entozoon'
    //     email: 'entozoon@gmail.com'
    //     dinners: [1, 2]
    //
    // Dinners:
    //   1timestamp1: (push generated key)
    //     name: 'fish and chips'
    //     rating: 4.5
    //     image: 'data:image/png;base64,iVBORw0KGgoAAA'
    //     date: 2017-03-05 12:00pm
    //   2timestamp2:
    //     name: 'fish and pips'
    //     rating: 0.5
    //     image: 'data:image/png;base64,iVBORw0KGgoAAB'
    //     date: 2017-03-05 12:10pm
    //

    let dinnersRef = firebase.database().ref('dinners/');
    dinnersRef.push().then(id => {
      this.setState({ dinnerId: id });
      this.state.dinnerId.set({
        image: data
      });
    });
    /*
    this.setState({ dinnerId: dinnersRef.push() });
    this.state.dinnerId.set({
      image: data
    });
    */

    //
    // This can all be async of course..
    //
    const app = new Clarifai.App({
      apiKey: 'aa4d7f9d292a4590a702f007e23b1384'
    });

    data = data.substr('data:image/png;base64,'.length);

    let that = this; // are we having fun yet?

    app.models
      .predict(
        'bd367be194cf45149e75f01d59f77ba7', // Clarifai.FOOD_MODEL ?
        // 'https://samples.clarifai.com/food.jpg'
        { base64: data }
      )
      .then(
        function(response) {
          // do something with response
          //alert(response);
          console.log(response);
          console.log(response.outputs[0].data.concepts); // array of objects with name
          let concepts = response.outputs[0].data.concepts.map(item => {
            return item.name;
          });
          that.setState({ concepts: concepts });
          console.log(concepts);
          response.outputs[0].data.concepts.forEach(concept => {
            //console.log(concept.name);
          });
        },
        function(error) {
          // there was an error
          console.log('Clarifai error: ');
          console.log(error);
        }
      );
  }

  nameChange(event) {
    this.state.dinnerId.update({
      name: event.target.value
    });
  }

  videoUpdated(size) {
    //alert(JSON.stringify(size));
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

    // RIGHT SO BASICALLY
    // I can't have <video> here because, if it renders again.. it all fucks up.
    // Need to be a standalone thing, or better yet a video react object..
    //return false;
    //return <video id="video" width="320" height="240" autoplay />;
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
          ? <button className="btn" onClick={this.takePhoto.bind(this)}>
              Take photo
            </button>
          : ''}
        {this.state.dinnerId ? <input onChange={this.nameChange.bind(this)} /> : ''}
        {this.state.concepts.length ? <Concepts concepts={this.state.concepts} /> : ''}
      </div>
    );
  }
}
