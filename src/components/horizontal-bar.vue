<script>
import { HorizontalBar } from 'vue-chartjs'
export default {
  extends: HorizontalBar,
  props: ['chartData'],
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function (tooltipItems, data) {
              return tooltipItems.xLabel + ' Colaboradores'
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              callback: function (value) {
                return value.substring(0, 8).concat('...')
              },
              beginAtZero: false
            },
            gridLines: {
              display: false
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }]
        },
        title: {
          display: true,
          text: 'COLABORADORES POR CARGO'
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style>

</style>
