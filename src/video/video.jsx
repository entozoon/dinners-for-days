import React from 'react';

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
  }

  componentDidMount() {
    let that = this;

    var video = document.getElementById('video');

    navigator.getMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    navigator.getMedia(
      {
        video: {
          facingMode: 'environment', // rear camera
          //width: 1280, // if it's portrait though, I mean, that's that
          width: 720, // if it's portrait though, I mean, that's that
          height: 720
        },
        audio: false
      },
      stream => {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }

        // When it starts playing, grab the width/height of the video stream
        video.addEventListener('canplay', () => {
          //alert(video.videoWidth + ', ' + video.videoWidth);
          //this.state.width = video.videoWidth;
          //this.state.height = video.videoHeight;
          that.setState({
            width: video.videoWidth,
            height: video.videoHeight
          });
          that.props.updated({
            width: video.videoWidth,
            height: video.videoHeight
          });
        });

        video.src = window.URL.createObjectURL(stream);
      },
      erm => {}
    );
  }

  render() {
    return false;
  }
}
