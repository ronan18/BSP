<template>
<div id="app">
  <router-view/>
</div>
</template>

<script>
import '../node_modules/minireset.css/minireset.min.css'
import './assets/globalStyles.css'
var firebase = require('firebase');
var firebaseui = require('firebaseui');
var config = {
  apiKey: "AIzaSyDUN6ELYHfNEs3RJuMZSSBm_17XukWNyZg",
  authDomain: "rmbsp-968e9.firebaseapp.com",
  databaseURL: "https://rmbsp-968e9.firebaseio.com",
  projectId: "rmbsp-968e9",
  storageBucket: "rmbsp-968e9.appspot.com",
  messagingSenderId: "915216215356"
};
firebase.initializeApp(config);
export default {
  name: 'App'
}
</script>
