<template>
  <div :id="id" style="width: 100%; height: 100%;" />
</template>
<script lang="ts">
import { Prop, Component, Watch } from 'vue-property-decorator'
import * as echarts from 'echarts'
import { mixins } from 'vue-class-component'
import ResizeMixins from './resize-mixins'

@Component({
  name: 'pieChart',
})
export default class extends mixins(ResizeMixins) {
  @Prop({ default: 'chartId' }) public id!: string
  @Prop({ default: '' }) private width!: string
  @Prop({ default: '' }) private height!: string
  @Prop({ default: () => ['#2179FF'], required: false })
  private color!: string[]
  @Prop({ required: true }) private option!: object

  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  }

  activated() {
    if (this.chart) {
      this.chart.resize()
    }
  }

  @Watch('option', { deep: true })
  onFilterTextChange() {
    this.setOpt()
  }

  init() {
    // 有传固定宽高，不会自适应
    if (this.width) {
      this.chart = echarts.init(
        document.getElementById(this.id) as HTMLDivElement,
        '',
        {
          width: parseInt(this.width),
          height: parseInt(this.height),
          devicePixelRatio: 2.5,
        },
      )
      this.setOpt()
    }
    // 没有传宽度，会自适应父元素宽高
    else {
      this.chart = echarts.init(
        document.getElementById(this.id) as HTMLDivElement,
        '',
        {
          devicePixelRatio: 2.5,
        },
      )
      this.setOpt()
      // @ts-ignore
      const elementResizeDetectorMaker = require('element-resize-detector') //导入
      const erdUltraFast = elementResizeDetectorMaker({
        strategy: 'scroll',
        callOnAdd: true,
      })

      erdUltraFast.listenTo(
        document.getElementById(this.id) as HTMLDivElement,
        () => {
          if (!this.chart) return
          this.chart.resize()
        },
      )
    }
  }

  setOpt() {
    if (this.chart) {
      this.chart.setOption(
        {
          ...this.option,
        },
        true,
      )
    }
  }
}
</script>
<style lang="scss" scoped></style>
