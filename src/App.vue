<template>
<div id="app">
    <div class="camera-modal">
      <video ref="video" class="camera-stream"/>
      <div class="camera-modal-container">
            <span @click="capture" class="take-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
              <i class="material-icons">camera</i>
            </span>
        </div>
    </div>
  </div>
<!--<login/>-->

</template>

<script>
require('material-design-lite')
import firebase from 'firebase';
import Login from './components/Login.vue' 
export default {
  name: 'app',
  components: {
    Login
  },
  data () {
    return {
      mediaStream: null
    }
  },
  methods: {
    capture () {
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0];
      const imageCapture = new window.ImageCapture(mediaStreamTrack);

      return imageCapture.takePhoto().then(blob => {
        console.log('file ====', blob)
        firebase.storage().ref().child(`images/picture-${new Date().getTime()}`).put(blob).then(snapshop => {
          console.log('snapshop file ====', snapshop);
          firebase.storage().ref().child(snapshop.ref.location.path).getDownloadURL().then(url => {
            console.log('url ====', url);
            //Insertamos en una tabla el id del usuario, la foto y  descripción.

          }).catch(error => {
            console.error('error get url file', error)
            switch (error.code) {
              case 'storage/object_not_found':
                // File doesn't exist
                break;
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;
              case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;
            }
          });
        });
      })
    }
  },
  mounted () {
    navigator.mediaDevices.getUserMedia({ video: true }).then(mediaStream => {
      this.mediaStream = mediaStream;
      this.$refs.video.srcObject = mediaStream;
      this.$refs.video.play();
    }).catch(error => {
      console.error('getUserMedia() error:', error);
    });
  },
  destroyed () {
    const tracks = this.mediaStream.getTracks();
    tracks.map(track => track.stop());
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');

  body {
      background-color: #F0F0F0;
  }
  #app {
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
  }
   .camera-modal {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
        background-color: white;
        z-index: 10;
    }
    .camera-stream {
        width: 100%;
        max-height: 100%;
    }

    .camera-modal-container {
        position: absolute;
        bottom: 0;
        width: 100%;
        align-items: center;
        margin-bottom: 24px;
    }
    .take-picture-button {
        display: flex;
    }

</style>