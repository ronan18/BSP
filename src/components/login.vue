<template>
<div class="page login">
  <div class="welcomeContainer">
    <h1>Please Login to continue</h1>
    <router-link class="startBtn" :to="{ name: 'login'}">Start</router-link>
  </div>

</div>
</template>
<script>
import '../assets/login.css'
var firebase = require('firebase');
export default {
  name: "login",
  created: function() {
    console.log('login flow');
  },
  data: () => ({

  })
}
</script>
