<template>
  <el-table :data="tableData" border style="width: 100%;">
    <el-table-column prop="index" label="编号" width="180"></el-table-column>
    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
  </el-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const num = 20 + Math.ceil(Math.random() * 50)
const data: any = []

@Component({
  name: 'ts-table',
})
export default class extends Vue {
  tableData: any = []
  mounted() {
    let data = []
    for (let i = 0; i < num; i++) {
      data.push({
        index: i + 1,
        name: '王小虎 - ' + (i + 1),
        address: `上海市普陀区金沙江路${i + 1}弄`,
      })
    }

    this.tableData = data
  }
}
</script>
<style lang="scss" scoped></style>
