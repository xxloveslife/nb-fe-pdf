import { Component, Vue } from 'vue-property-decorator'
import { ECharts } from 'echarts'

@Component({
  name: 'ResizeMixins',
})
export default class extends Vue {
  protected chart!: ECharts | null

  mounted() {
    this.initResizeEvent()
  }

  beforeDestroy() {
    this.destoryResizeEvent()
  }

  private chartResizeHandler() {
    if (this.chart) {
      this.chart.resize()
    }
  }

  private initResizeEvent() {
    window.addEventListener('resize', this.chartResizeHandler)
  }

  private destoryResizeEvent() {
    window.removeEventListener('resize', this.chartResizeHandler)
  }
}
