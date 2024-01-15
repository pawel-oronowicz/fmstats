<script setup>
import { ref } from 'vue'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import ApexCharts from 'apexcharts'
DataTable.use(DataTablesCore)

var uploadedData = ref([])
uploadedData.value = JSON.parse(window.localStorage.getItem('uploadedData'))

const columns = [
  { data: 'Name', title: 'Name' },
  { data: 'Nat', title: 'Nationality' },
  { data: 'Club', title: 'Club' },
  { data: 'Apps', title: 'Apps' },
  { data: 'Gls', title: 'Goals' },
  { data: 'xG', title: 'xG'},
  { data: 'Av Rat', title: 'Avg Rating' }
]
</script>

<style>
@import 'bootstrap';
@import 'datatables.net-bs5';
</style>

<template>
    <div v-if="!uploadedData.length" class="greetings">
      <h1 class="green">Player stats</h1>
    </div>
  
    <DataTable
     :data="uploadedData" 
     :columns="columns" 
     :options="{ order: [5, 'desc'] , pageLength: 25 }"
     class="table table-striped">
    </DataTable>
  
    <div id="chart" style="max-width: 650px;margin: 35px auto;">
    </div>
</template>

<style>
    button.tab-button {
        margin-right: 16px;
    }
</style>