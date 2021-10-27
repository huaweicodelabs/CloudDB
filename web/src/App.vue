<template>
  <div id="app">
    <h1>Welcome to CodeLab</h1>
    <div class="login">
      <button @click="loginAnonymously">loginAnonymously</button>
    </div>
    <quickstart/>
  </div>
</template>

<script>
import quickstart from './components/quickstart'
import agconnect from '@agconnect/api'
import '@agconnect/auth'
import '@agconnect/instance'
import {agConnectConfig} from './components/agconnect-services'

export default {
  name: 'App',
  components: {
    quickstart
  },
  methods: {
    loginAnonymously () {
      agconnect.instance().configInstance(agConnectConfig)
      agconnect.auth().signInAnonymously().then((res) => {
        console.log('login successfully!')
        alert('login successfully!')
      }).catch((err) => {
        alert(JSON.stringify(err))
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
