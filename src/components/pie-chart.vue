<script>
import { Doughnut } from 'vue-chartjs'
export default {
  extends: Doughnut,
  props: ['chartData', 'title'],
  data () {
    return {
      options: {
        responsive: true,
        hoverBorderWidth: 20,
        legend: {
          position: 'right',
          display: true
        },
        title: {
          display: true,
          text: this.title
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
