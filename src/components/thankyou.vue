<template>
<div class="page thanks">
  <div class="vcenter">
    <h1>Thank you!</h1>
    <h2>for participating in Ronan &amp; Max's BSP experiment</h2>
    <a class="feedBackBtn" href="https://ronan39.typeform.com/to/iNAyMm" target="_blank">Give Feedback!!</a>
  </div>

</div>
</template>
<script>
import '../assets/thanks.css'
var firebase = require('firebase')
export default {
  name: "thanks",
  data: () => ({

  }),
  created() {
    //do something after creating vue instance
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
    } else {
      this.$router.push('/')
    }
    firebase.database().ref('data/' + uid + '/info').set({
      name: name,
      email: email,
      uid: uid
    });
    firebase.database().ref('data/' + uid).once('value').then((snapshot) => {
      if (!snapshot.hasChild('reactionTime')) {
        this.$router.push('/reaction')
      }
    });
    firebase.database().ref('data/' + uid).once('value').then((snapshot) => {
      if (!snapshot.hasChild('typingSpeed')) {
        this.$router.push('/typing')
      }
    });
  }
}
</script>
