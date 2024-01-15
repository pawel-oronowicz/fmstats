<script setup>
import Papa from "papaparse"
import { ref, computed } from 'vue'
import ApexCharts from 'apexcharts'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
DataTable.use(DataTablesCore)

const temporaryUploadedRows = ref([])
var uploadedData = ref([])

function getAppsStarted(appsString) {
  return appsString.substring(0, appsString.indexOf("("))
}

function getAppsSubbedIn(appsString) {
  var regexAppsSubbedIn = appsString.match(/\((.*?)\)/)

  if (regexAppsSubbedIn) {
    return regexAppsSubbedIn[1]
  }

  return null;
}

function calculateTotalApps(appsString) {
  var appsStarted = appsString.substring(0, appsString.indexOf("("))
  if(appsStarted == '') {
    appsStarted = appsString
  }

  const regexAppsSubbedIn = appsString.match(/\((.*?)\)/)
  var appsSubbedIn = 0
  
  if(regexAppsSubbedIn) {
    appsSubbedIn = regexAppsSubbedIn[1]
  }
  
  return parseInt(appsStarted) + parseInt(appsSubbedIn)
}

function calculateGoalsPerXg(goals, xG) {
  return parseFloat(goals / xG)
}

function formatUploadedDataFields(data) {
  console.log(data)
  data.Ast = parseInt(data.Ast)
  data["Av Rat"] = parseFloat(data["Av Rat"])
  data["Cr A"] = parseInt(data["Cr A"])
  data["Cr C"] = parseInt(data["Cr C"])
  data.Gls = parseInt(data.Gls)
  data["K Pas"] = parseInt(data["K Pas"])
  data.Mins = parseInt(data.Mins.replace(',', ''))
  data["Pas A"] = parseInt(data["Pas A"].replace(',', ''))
  data.PoM = parseInt(data.PoM)
  data["Ps C"] = parseInt(data["Ps C"].replace(',', ''))
  data.ShT = parseInt(data.ShT.replace(',', ''))
  data.Shots = parseInt(data.Shots.replace(',', ''))
  data["Tck A"] = parseInt(data["Tck A"].replace(',', ''))
  data["Tck W"] = parseInt(data["Tck W"].replace(',', ''))
  data.Tgls = parseInt(data.Tgls.replace(',', ''))
  data.xG = parseFloat(data.xG)

  return data
}

function uploadFile() {
  var uploadedFile = document.getElementById("uploadFile").files[0]

  var count = 0
  Papa.parse(uploadedFile, {
    header: true,
    encoding: "UTF-8",
    step: function(result) {
      if((result.data).hasOwnProperty('Name') && result.data.Name != '') {
        result.data = formatUploadedDataFields(result.data)
        result.data.Apps = calculateTotalApps(result.data.Apps)
        result.data.GoalsPerXg = calculateGoalsPerXg(result.data.Gls, result.data.xG)
        temporaryUploadedRows.value.push(result.data)
        count++
      }
    },
    complete: function(results, uploadedFile) {
      console.log('parsing complete read', count, 'records.')
      window.localStorage.setItem("uploadedData", JSON.stringify(temporaryUploadedRows.value))
      uploadedData.value = JSON.parse(window.localStorage.getItem('uploadedData'))
      console.log(uploadedData.value)
    }
  })
}
</script>

<template>
  <div class="tab">
    <h1>Upload your file</h1>
    <div class="greetings">
      <input type="file" id="uploadFile" @change="uploadFile" />
    </div>

    <div id="chart" style="max-width: 650px;margin: 35px auto;">
    </div>
  </div>
</template>

<style>
@import 'bootstrap';
@import 'datatables.net-bs5';
</style>