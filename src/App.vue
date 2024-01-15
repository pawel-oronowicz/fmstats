<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import FileUpload from './components/FileUpload.vue'
import Statistics from './components/Statistics.vue'
import Charts from './components/Charts.vue'

const routes = {
  '/': FileUpload,
  '/file-upload': FileUpload,
  '/statistics': Statistics,
  '/charts': Charts
}
</script>

<template>
  <Navbar />
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    margin-right: 16px;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
