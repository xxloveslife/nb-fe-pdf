<template>
  <div class="print">
    <HelloWorld
      class="page-splite-flag"
      msg="Welcome to Your Vue.js + TypeScript App"
    />

    <card-table>
      <template #card-table-header>
        <div style="text-align: left;">
          <h2 class="module-title">模块2 指标分析头部说明</h2>
          <div class="info">这是分析结果1</div>
          <div class="info">这是分析结果2</div>
          <div class="info">这是分析结果3</div>
        </div>
      </template>
      <template #card-table>
        <ts-table />
      </template>
      <template #card-table-footer>
        <div style="text-align: right;">
          <p class="info">
            <span>*</span>
            年化收益率
          </p>
          <p class="info">
            <span>*</span>
            夏普比率
          </p>
        </div>
        <div class="info">module2 动态table底部说明1</div>
      </template>
    </card-table>

    <div class="chart-wrapper page-splite-flag">
      <h2 class="chart-info">模块3 module3 图表模块</h2>
      <line-chart
        id="line-chart-one"
        style="
          width: 90%;
          height: 300px;
          box-sizing: border-box;
          margin: 20px auto;
        "
        :option="optionData"
      />
      <div class="flex-row-between">
        <div></div>
        <div>
          <div class="info">堆叠区域图头部说明1</div>
          <div class="info">堆叠区域图头部说明2</div>
          <div class="info">堆叠区域图头部说明3</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import lineChart from '@/components/lineChart.vue'
import tsTable from '@/components/table.vue'
import cardTable from '@/components/cardTable.vue'

@Component({
  components: {
    HelloWorld,
    lineChart,
    tsTable,
    cardTable,
  },
})
export default class printView extends Vue {
  optionData = {
    title: {
      text: '堆叠区域图',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '邮件营销',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: '联盟广告',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: '视频广告',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: '直接访问',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: '搜索引擎',
        type: 'line',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'top',
          },
        },
        areaStyle: {},
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  }
}
</script>
<style scoped>
.module-title {
  line-height: 30px;
  margin-top: 20px;
}
.print {
  width: 100%;
  margin: 0 auto;
}
.chart-info {
  text-align: left;
}
.chart-wrapper {
}
.flex-row-between {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.info {
  line-height: 30px;
}
</style>
