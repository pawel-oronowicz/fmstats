<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="navbar">
    <div class="container">
      <a class="navbar-brand" href="#">FM Stats</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="dropdown">
        <a @click="triggerDropdown" class="dropdown-toggle">Statistics</a>
        <div id="statisticsDropdown" class="dropdown-content">
          <router-link to="/statistics/attacking">Attacking</router-link>
          <router-link to="/statistics/defending">Defending</router-link>
          <router-link to="/statistics/goalkeeping">Goalkeeping</router-link>
        </div>
      </div>
      <div class="collapse navbar-collapse" id="navbar">
        <router-link to="/upload">Upload</router-link>
        <router-link to="/charts">Charts</router-link>
      </div>
    </div>
    <div
      class="nav-item"
      v-for="link in links">
      <router-link
        :key="link.id"
        :to="`${link.page}`"
      >
        {{ link.text }}
      </router-link>

      <div class="nav-item-drawer">
        <router-link
          v-for="subLink in link.subLinks"
          :key="subLink.id"
          :to="`${subLink.page}`"
        >
          {{ subLink.text }}
        </router-link>
      </div>

    </div>
  </nav>
</template>
  
<script setup lang="ts">
import { RouterLink } from "vue-router";

const navBarItems = [
  { title: "Home", url: "/" },
];
const links = [
  {
    id: 0,
    text: 'Upload',
    page: '/upload',
    subLinks: [
      {
        id: 0,
        text: 'Buy Sublink 1',
        page: '/charts'
      },
      {
        id: 1,
        text: 'Buy Sublink 2',
        page: '/statistics'
      },
    ]
  }
]

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function triggerDropdown() {
  document.getElementById("statisticsDropdown")!.classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropdown-toggle')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
</script>
<style>
.dropdown {
  cursor: pointer;
}
/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 140px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 6px 8px;
  text-decoration: none;
  display: block;
  margin-right: 0;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #ddd;}

/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
.show {display:block;}
</style>