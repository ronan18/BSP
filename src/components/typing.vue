<template>
<div class="page typing">
  <header>
    <h1>Typing Test</h1>
    <h2>a test to calculate your WPM (shocker)</h2>
  </header>
  <section class="typingTest">
    <div class="centerdContainer">
      <div v-if="!testing">
        <button @click="startTest" class="startTestBtn">Take Test!</button>
      </div>
      <div v-if="testing">
        <div v-if="testText" class="textToType">
          <p>{{testText}}</p>
        </div>
        <input v-if="testText" onCopy="return false" onDrag="return false" onDrop="return false" onPaste="return false" autocomplete="off" v-model="userText" id="typingInput" @keyup.enter="submit" @keyup="startTimer" autofocus type="text" name="text" value=""
          placeholder="Copy the above results">
        <p class="typeingResults" v-if="results"><b>{{round(wpm)}}</b> wpm with <b>{{errorCount}}</b> error(s)</p>
        <button @click="next" class="startTestBtn">Next!</button>
      </div>

    </div>
  </section>
  <section class="typingInstructions">

    <p>Type as fast as possible with as little mistakes as possible.</p>

  </section>

</div>
</template>
<script>
var firebase = require('firebase')
//TODO: https://github.com/kpdecker/jsdiff
var jsdiff = require('diff');
import '../assets/typing.css'
export default {
  name: "typing",
  data: () => ({
    testing: false,
    testText: '',
    testWordCount: 0,
    userText: '',
    userWordCount: 0,
    error: null,
    startedTime: 0,
    endTime: 0,
    result: null,
    started: false,
    wpm: null,
    errors: null,
    errorCount: 0,
    results: false,
    scentences: [
      'Once a long long time ago there was a child. This child really liked cheese but he was not able to eat his cheese because Google Docs was taking forever to load. Then he used Graphite Writer (A very un-shrimpy text editor) which loaded much faster, allowing him to eat as much cheese as he wanted.',
      'Announcing brand new Graphite Writer t-shirts, ties, and sweatshirts!! You can buy t-shirts for $12.95 ties for $19 and sweatshirts for $21. You can buy any of these un-shrimpy items from either Ronan or Sasha. A long time ago, there was a great person named Red Fred who lived in a shed.',
      'Once there was a person named Red Fred. Red Fred was no shrimpy person, he was an orienteering god. He won the international orienteering contest at least 50 times. He could orienteer his way out of almost any situation. But he was missing something from his life, a Graphite Writer t-shirt.'
    ]
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
    } else {
      this.$router.push('/')
    }
    firebase.database().ref('data/' + uid).once('value').then((snapshot) => {
      if (!snapshot.hasChild('reactionTime')) {
        this.$router.push('/reaction')
      }
    });
    firebase.database().ref('data/' + uid).once('value').then((snapshot) => {
      if (snapshot.hasChild('typingSpeed')) {
        this.$router.push('/thankyou')
      }
    });


  },
  methods: {
    next: function() {
      this.$router.push('/thankyou')
    },
    round: function(num) {
      return Math.round(num * 100) / 100
    },
    submit: function() {
      let clickedTime = Date.now();
      this.result = (clickedTime - this.startedTime) / 1000;

      function WordCount(str) {
        return str.split(" ").length;
      }

      this.testWordCount = WordCount(this.testText)
      this.userWordCount = WordCount(this.userText)
      //console.log(this.userText);
      this.error = this.userText !== this.testText
      //console.log(this.error);
      this.wpm = (this.userWordCount / this.result) * 60
      console.log(this.result, this.error, this.testWordCount, this.userWordCount, this.wpm + ' WPM');
      let errorList = jsdiff.diffWords(this.testText, this.userText)

      this.errors = errorList

      console.log(this.errors);
      for (var i = 0; i < this.errors.length; i++) {
        console.log(this.errors[i]);
        if (this.errors[i].removed) {
          this.errorCount = this.errorCount + this.errors[i].count
        }
        //Do something
      }
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
      console.log(uid, {
        wpm: this.wpm,
        errorCount: this.errorCount,
        time: this.result,
        allData: {
          error: this.error,
          testWordCount: this.testWordCount,
          userWordCount: this.userWordCount,
          testText: this.testText,
          userText: this.userText,
          startedTime: this.startedTime,
          endedTime: clickedTime
        }
      });

      firebase.database().ref('data/' + uid + '/typingSpeed').set({
        wpm: this.wpm,
        errorCount: this.errorCount,
        time: this.result,
        allData: {
          error: this.error,
          testWordCount: this.testWordCount,
          userWordCount: this.userWordCount,
          testText: this.testText,
          userText: this.userText,
          startedTime: this.startedTime,
          endedTime: clickedTime
        }
      });
      this.testText = null
      this.results = true;
    },
    startTimer: function() {
      if (!this.started) {
        this.startedTime = Date.now();
        this.started = true
        console.log('started');
      }

    },
    startTest: function() {
      this.testText = this.scentences[Math.floor(Math.random() * this.scentences.length)]
      this.testing = true;




      //document.getElementById("typingInput").focus();
    }
  }
}
</script>
