
<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, 'rgba(228, 242, 254, 1)')
    this.gradient.addColorStop(0.5, 'rgba(228, 242, 254, 0.5)');
    this.gradient.addColorStop(1, 'rgba(228, 242, 254, 0.25)');

    console.log("chartdata", this.chartData);
    this.chartData.datasets[0].backgroundColor = this.gradient;

    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}

</script>

