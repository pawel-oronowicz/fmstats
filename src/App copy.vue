<script setup>
import { ref, computed } from 'vue'
import './index.css'
import FileUpload from './components/FileUpload.vue'
import Statistics from './components/Statistics.vue'
import Charts from './components/Charts.vue'

const routes = {
  '/': FileUpload,
  '/file-upload': FileUpload,
  '/statistics': Statistics,
  '/charts': Charts
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  console.log(currentPath)
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/']
})

const currentTab = ref('FileUpload')

const tabs = {
  FileUpload,
  Statistics,
  Charts
}
</script>

<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"/></svg>
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <a v-for="(_, tab) in tabs" href="#" @click="currentTab = tab">
            <li
              :key="tab"
              :class="['nav-link px-2 link-secondary', { active: currentTab === tab }]"
              :id="tab"
              @click="currentTab = tab"
            >
              {{ tab }}
            </li>
          </a>
        </ul>

        <div class="dropdown text-end">
          <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
          </a>
          <ul class="dropdown-menu text-small">
            <li><a class="dropdown-item" href="#">New project...</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
	<component :is="tabs[currentTab]" class="tab"></component>
</template>



<style>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

</style>
