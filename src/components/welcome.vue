<template>
<div class="page">

  <div v-if="app" class="welcomeContainer">
    <h1>Welcome to Ronan &amp; Max's BSP project</h1>
    <button class="startBtn" @click="login">Start</button>
  </div>
  <div v-if="loggingin" class="loggingIn">
    <div class="">
      <h1>Logging In</h1>
    </div>

  </div>


</div>
</template>
<script>
import '../assets/welcome.css'
var firebase = require('firebase');
var provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  'login_hint': 'name@prospectsierra.org'
});
export default {
  name: "welcome",
  methods: {
    login() {

      this.loggingin = true;
      var user = firebase.auth().currentUser;

      if (user) {
        // User is signed in.
        var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid, emailVerified;

        if (user != null) {
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          emailVerified = user.emailVerified;
          uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
          // this value to authenticate with your backend server, if
          // you have one. Use User.getToken() instead.
        }
        firebase.database().ref('data/' + uid).once('value').then((snapshot) => {
          if (!snapshot.hasChild('reactionTime')) {
            this.$router.push('/reaction')
          } else if (!snapshot.hasChild('typingSpeed')) {
            this.$router.push('/typing')
          } else {
            this.$router.push('/thankyou')
          }
        })
      } else {
        // No user is signed in.
        firebase.auth().signInWithPopup(provider).then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          this.$router.push('reaction')
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      }

    }
  },
  data: () => ({
    loggingin: false,
    app: true
  })
}
</script>
