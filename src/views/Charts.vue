<script>
import { onBeforeUpdate, onUpdated, ref } from 'vue'
import ApexCharts from 'apexcharts'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router';

var uploadedData = ref([])
uploadedData.value = JSON.parse(window.localStorage.getItem('uploadedData'))

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a,b) {
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

export function getChartGoalsAppsScatter(maxCount = 25) {
  var data = [];
  var count = 0

  const uploadedDataSorted = uploadedData.value.sort(dynamicSort("-Gls"))

  for(const item of uploadedDataSorted) {
    if(count === maxCount) break
    data.push({ name: item.Name, data: [[parseInt(item.Apps), parseInt(item.Gls)]] })
    count++
  }

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
      tickAmount: 11,
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
      tickAmount: 8,
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

  var chart = new ApexCharts(document.querySelector("#chartGoalsAppsScatter"), options);
  chart.render();
}

export function getChartGoalsPerXgBar(maxCount = 25) {
  var data = []
  var names = []
  var goalsPerXg = []
  var xG = []
  var goals = []
  var count = 0

  const uploadedDataSorted = uploadedData.value.sort(dynamicSort("-Gls"))

  for(const item of uploadedDataSorted) {
    if(count === maxCount) break
    data.push({name: item.Name, goalsPerXg: item.GoalsPerXg, goals: item.Gls, xG: item.xG})
    count++
  }
  data.sort(dynamicSort("-goalsPerXg"))
  for(const item of data) {
    names.push(item.name)
    goalsPerXg.push(item.goalsPerXg)
    goals.push(item.goals)
    xG.push(item.xG)
  }
  
  var options = {
    series: [{
      data: goalsPerXg
    }],
    chart: {
      type: 'bar',
      height: 600
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    yaxis: {
      min: 0.5
    },
    xaxis: {
      categories: names,
      title: {
        text: 'Goals per xG'
      },
      tickAmount: 17,
      min: 0.0
    },
    legend: {
      show: false
    },
    tooltip: {
      custom: function({series, seriesIndex, dataPointIndex, w}) {
        var xG_formatted = xG[dataPointIndex].toFixed(2)
        var name = names[dataPointIndex]
        var goals_formatted = goals[dataPointIndex]
        var goalsPerXg_formatted = goalsPerXg[dataPointIndex].toFixed(2)
        
        return '<b>' + name + '</b>' +
        'Goals per xG: ' + goalsPerXg_formatted + '<br/>' +
        'Goals: ' + goals_formatted + '<br/>' +
        'xG: ' + xG_formatted;
      }
    }
  };

  var chart = new ApexCharts(document.querySelector("#chartGoalsPerXgBar"), options);
  chart.render();
}

export function renderCharts(type) {
  getChartGoalsAppsScatter(25)
  getChartGoalsPerXgBar(25)
}
</script>

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