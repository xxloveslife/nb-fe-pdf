<template>
  <div class="btn-list">
    <el-button
      type="button"
      class="el-button el-button--default el-button--small el-button--primary"
      @click="toClickPage"
    >
      window.print 纯前端 点击下载
    </el-button>

    <el-button
      type="button"
      class="el-button el-button--default el-button--small el-button--primary"
      @click="toSyncPage"
    >
      node 同步单个下载
    </el-button>

    <el-button
      type="button"
      class="el-button el-button--default el-button--small el-button--primary"
      @click="toAsyncDownloadPage"
    >
      node 异步单个下载
    </el-button>
    <p style="margin-top: 20px;">
      node
      异步批量下载，和node异步单个下载类似，只是请求方式变为post，将批量下载的链接和参数传递过去即可
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'printList',
})
export default class extends Vue {
  toClickPage() {
    console.log('toClickPage')
    this.$router.push('/clickPage')
  }

  toSyncPage() {
    console.log('toSyncPage')
    this.$router.push('/syncPage')
  }

  toAsyncDownloadPage() {
    console.log('asyncDownload')
    this.$router.push('/asyncDownload')
  }
}
</script>
<style>
.btn-list {
  margin-top: 20px;
}
</style>
