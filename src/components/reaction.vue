<template>
<div class="page reaction">
  <header>
    <h1>Reaction Time Test</h1>
    <h2>a test of your reaction time (woah)</h2>
  </header>
  <section class="reactionTest">
    <div class="centerdContainer">
      <div class="arrowContainer">
        <p v-if="key" class="hitSpace">Hit Space!!</p>
      </div>
      <div v-if="!testing">
        <button @click="startTest" class="startTestBtn">{{startTestText}}</button>
        <p class="results" v-if="tryAgain">Try {{tries}} out of 5 average {{average}}s</p>

      </div>
      <div v-if="next">
        <button @click="goNext" class="startTestBtn">Next</button>
        <p class="results" v-if="done">Try {{tries}} out of 5 average {{average}}s</p>

      </div>


    </div>
  </section>
  <section class="reactionInstructions">

    <p>Place your hand on your space key. When "Hit Space" pops up hit space.</p>

  </section>

</div>
</template>
<script>
import '../assets/reaction.css'
var firebase = require('firebase')
var database = firebase.database();

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export default {
  name: "reaction",
  data: () => ({
    testing: false,
    key: false,
    result: null,
    total: 0,
    average: 0,
    tries: 0,
    results: [],
    startTestText: 'Start Test!',
    tryAgain: false,
    next: false,
    done: false
  }),
  created() {
    //do something after creating vue
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
    firebase.database().ref('data/' + uid + '/reactionTime').once('value').then((snapshot) => {
      console.log(snapshot.val().average);
      if (snapshot.val().average) {

        this.$router.push('typing')
      }
    });

  },
  methods: {
    goNext() {
      this.$router.push('typing')

    },
    startTest() {
      this.testing = true;
      setTimeout(() => {
        let createdTime = Date.now();
        this.key = true
        document.onkeydown = (e) => {

          e = e || window.event;

          if (e.keyCode == '32') {
            console.log('space');
            this.key = false
            let clickedTime = Date.now();
            this.result = (clickedTime - createdTime) / 1000;
            this.tries++;
            this.results.push(this.result)
            this.total = this.total + this.result
            this.average = Math.round((this.total / this.tries) * 100) / 100
            this.startTestText = 'Try Again'
            document.onkeydown = null

            this.result = false
            if (this.tries == 5) {
              this.done = true
              this.next = true
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
              firebase.database().ref('data/' + uid + '/reactionTime').set({
                average: this.average,
                results: this.results
              });
            } else {
              this.tryAgain = true
              this.testing = false

            }

          }

        }

      }, randomIntFromInterval(1000, 2000));
    }
  }

}
</script>
