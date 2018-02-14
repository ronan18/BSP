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
        <div class="textToType">
          <p>{{testText}}</p>
        </div>
        <input onCopy="return false" onDrag="return false" onDrop="return false" onPaste="return false" autocomplete="off" v-model="userText" id="typingInput" @keyup.enter="submit" @keyup="startTimer" autofocus type="text" name="text" value="" placeholder="type here">
      </div>

    </div>
  </section>
  <section class="typingInstructions">

    <p>Type as fast as possible with no mistakes.</p>

  </section>

</div>
</template>
<script>
//TODO: https://github.com/kpdecker/jsdiff
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
    scentences: [
      'Once along long time ago there was a child. This child really liked cheese but he was not able to eat his cheese because Google Docs was taking forver to load. Then he used Graphite Writer which loaded much faster, allowing him to eat as much cheese as he wanted.'
    ]
  }),
  methods: {
    submit: function () {
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
this.wpm = (this.userWordCount/this.result) * 60
      console.log(this.result, this.error, this.testWordCount,this.userWordCount, this.wpm + ' WPM');


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
