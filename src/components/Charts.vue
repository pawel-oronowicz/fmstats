<script setup>
import { ref } from 'vue'
import ApexCharts from 'apexcharts'
import { onMounted } from 'vue'

onMounted(() => {
  renderCharts()
})

var uploadedData = ref([])
uploadedData.value = JSON.parse(window.localStorage.getItem('uploadedData'))

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

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

function getDataGoalsAppsScatter(maxCount = 0) {
  //console.log(uploadedData.value)
  var data = [];
  var count = 0
  console.log(uploadedData.value)
  uploadedData.value.sort(dynamicSort("-Gls"))
  console.log(uploadedData.value)

  for(const item of uploadedData.value) {
    if(count === 25) break
    data.push({ name: item.Name, data: [[parseInt(item.Apps), parseInt(item.Gls)]] })
    count++
  }
  console.log(data)

  return data;
}

function renderCharts() {
  var data = getDataGoalsAppsScatter()
  var options = {
    series: data,
    chart: {
      width: 650,
      type: 'scatter',
      zoom: {
        enabled: true,
        type: 'xy'
      }
    },
    xaxis: {
      title: {
        text: 'Appearances'
      },
      tickAmount: 10,
      labels: {
        formatter: function(val) {
          return parseFloat(val).toFixed(0)
        }
      }
    },
    yaxis: {
      title: {
        text: 'Goals'
      },
      tickAmount: 10,
      labels: {
        formatter: function(val) {
          return parseFloat(val).toFixed(0)
        }
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      custom: function({series, seriesIndex, dataPointIndex, w}) {
        var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex]
        var name = w.globals.initialSeries[seriesIndex].name
        
        return '<b>' + name + '</b>' +
        'Appearances: ' + data[0] + '<br/>' +
        'Goals: ' + data[1];
      }
    }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}


</script>

<template>
  <div id="chart" class="chart" style="max-width: 650px;margin: 35px auto;">
  </div>
</template>

<style>
@import 'bootstrap';
</style>

<style>
  button.tab-button {
    margin-right: 16px;
  }
  
  .chart {
    min-width: 450px;
    max-width: 650px;
  }
</style>