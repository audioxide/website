<template>
    <div class="chart">
        <h3>New release score distribution</h3>
        <canvas id="yearly-breakdown">
    </div>
</template>

<script>
import Vue from 'vue'
import Chart from 'chart.js'

export default Vue.extend({
name: 'NewReleaseScoreDistribution',
  methods: {
    createChart() {
      var ctx = document.getElementById('yearly-breakdown').getContext('2d')
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['2015', '2016', '2017', '2018', '2019', '2020'],
          datasets: [
            {
              label: '12',
              backgroundColor: '#f1bdc9',
              data: [0, 1, 0, 0, 0, 0],
            },
            {
              label: '13',
              backgroundColor: '#f1ccd4',
              data: [0, 0, 1, 0, 0, 0],
            },
            {
              label: '14',
              backgroundColor: '#f0dbe0',
              data: [0, 1, 0, 0, 0, 0],
            },
            {
              label: '15',
              backgroundColor: '#f1e8eb',
              data: [0, 1, 0, 1, 1, 0],
            },
            {
              label: '16',
              backgroundColor: '#ebecee',
              data: [0, 0, 2, 2, 2, 2],
            },
            {
              label: '17',
              backgroundColor: '#d9e2e7',
              data: [2, 1, 1, 0, 3, 1],
            },
            {
              label: '18',
              backgroundColor: '#c7d9dd',
              data: [2, 2, 6, 4, 1, 3],
            },
            {
              label: '19',
              backgroundColor: '#baced5',
              data: [2, 3, 2, 3, 7, 5],
            },
            {
              label: '20',
              backgroundColor: '#a7c5cf',
              data: [0, 5, 2, 3, 2, 3],
            },
            {
              label: '21',
              backgroundColor: '#96bbc4',
              data: [4, 5, 2, 5, 4, 1],
            },
            {
              label: '22',
              backgroundColor: '#85b1bc',
              data: [2, 2, 3, 3, 5, 1],
            },
            {
              label: '23',
              backgroundColor: '#77a7b5',
              data: [1, 3, 2, 4, 2, 1],
            },
            {
              label: '24',
              backgroundColor: '#649dae',
              data: [0, 2, 1, 0, 0, 2],
            },
            {
              label: '25',
              backgroundColor: '#5693a5',
              data: [0, 0, 1, 0, 0, 1],
            },
            {
              label: '26',
              backgroundColor: '#438b9a',
              data: [0, 0, 0, 0, 0, 0],
            },
            {
              label: '27',
              backgroundColor: '#308194',
              data: [1, 0, 1, 0, 0, 0],
            },
          ],
        },
        options: {
          tooltips: {
            displayColors: true,
            callbacks: {
              mode: 'x',
            },
          },
          scales: {
            xAxes: [
              {
                stacked: true,
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                stacked: true,
                ticks: {
                  beginAtZero: true,
                },
                type: 'linear',
              },
            ],
          },
          responsive: true,
          maintainAspectRatio: false,
          legend: { position: 'bottom' },
        },
      })
    },
  },
})
</script>

<style lang="scss" scoped>
    @import '~assets/styles/variables.scss';
</style>