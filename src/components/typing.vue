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
        <input id="typingInput" autofocus type="text" name="text" value="" placeholder="type here">
      </div>

    </div>
  </section>
  <section class="typingInstructions">

    <p>Type as fast as possible with no mistakes.</p>

  </section>

</div>
</template>
<script>
import '../assets/typing.css'
export default {
  name: "typing",
  data: () => ({
    testing: false,
    testText: 'autofocus',
    scentences: [
      'Once along long time ago there was a child. This child really liked cheese but he was not able to eat his cheese because Google Docs was taking forver to load. Then he used Graphite Writer which loaded much faster, allowing him to eat as much cheese as he wanted.'
    ]
  }),
  methods: {
    startTest: function() {
      this.testText = this.scentences[Math.floor(Math.random() * this.scentences.length)]
      this.testing = true;

      //document.getElementById("typingInput").focus();
    }
  }
}
</script>
