<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  name: 'barChart',
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
              return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tooltipItems.yLabel)
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            ticks: {
              callback: function (value) {
                return value.substring(0, 8).concat('..')
              },
              beginAtZero: false
            },
            gridLines: {
              display: true
            }
          }]
        },
        title: {
          display: true,
          text: 'CUSTOS DOS DEPARTAMENTOS'
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    chartData (atual, anterior) {
      this.renderChart(this.chartData, this.options)
    }
  }
}
</script>
