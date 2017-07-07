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

    // Create video element which will contain a stream from the camera
    // (webcam / phone / tablet rear cam)
    var video = document.getElementById('video');

    navigator.getMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    // Grab the media source
    navigator.getMedia(
      {
        video: {
          facingMode: 'environment', // Rear camera if available
          width: 720, // NB: It won't necessarily obey these
          height: 720
        },
        audio: false
      },
      stream => {
        // Pipe the stream into the video element source
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }

        // When it starts playing, get the width/height of the video stream
        video.addEventListener('canplay', () => {
          //alert(video.videoWidth + ', ' + video.videoWidth);
          // Set local state
          that.setState({
            width: video.videoWidth,
            height: video.videoHeight
          });
          // Propagate up
          that.props.updated({
            width: video.videoWidth,
            height: video.videoHeight
          });
        });

        //video.src = window.URL.createObjectURL(stream);
      },
      vestigial => {}
    );
  }

  render() {
    return false;
  }
}
