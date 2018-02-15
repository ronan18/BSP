<template>
<div class="page reaction">
  <header>
    <h1>Reaction Time Test</h1>
    <h2>a test of your reaction time (woah)</h2>
    <p class="reactionInstructions">Place your hand on your space key. When "Hit Space" pops up hit space.</p>
  </header>
  <section class="reactionTest">
    <div class="centerdContainer">
      <div class="arrowContainer">
        <p v-if="info" class="info">Place your hand above the space key</p>
        <p v-if="key" class="hitSpace">Hit Space!!</p>
      </div>
      <div v-if="!testing">
        <button @click="startTest" class="startTestBtn">{{startTestText}}</button>
        <p class="results" v-if="tryAgain">Try {{tries}} out of 5 average {{average}}ms</p>

      </div>
      <div v-if="next">
        <button @click="goNext" class="startTestBtn">Next</button>
        <p class="results" v-if="done">Out of 5 tries your average was {{average}}ms</p>

      </div>


    </div>
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
    done: false,
    info: false
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
      firebase.database().ref('data/' + uid + '/info').set({
        name: name,
        email: email,
        uid: uid
      })
      firebase.database().ref('data/' + uid).once('value').then((snapshot) => {
        if (snapshot.hasChild('reactionTime')) {
          if (!snapshot.hasChild('typingSpeed')) {
            this.$router.push('/typing')
          } else {
            this.$router.push('/thankyou')
          }
        }
      })
    } else {
      this.$router.push('/')
    }



  },
  methods: {
    goNext() {
      this.$router.push('typing')

    },
    startTest() {
      var keys = {};
      window.onkeyup = function(e) {
        keys[e.keyCode] = false;
      }
      window.onkeydown = function(e) {
        keys[e.keyCode] = true;
      }
      this.testing = true;
      this.info = true
      setTimeout(() => {
        this.info = false
      }, 1000)
      setTimeout(() => {
        let createdTime = +new Date();
        this.key = true
        document.onkeydown = (e) => {

          e = e || window.event;

          if (e.keyCode == '32') {
            console.log('space');
            this.key = false
            let clickedTime = +new Date();
            this.result = (clickedTime - createdTime);
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

      }, randomIntFromInterval(2000, 3000));
    }
  }

}
</script>
