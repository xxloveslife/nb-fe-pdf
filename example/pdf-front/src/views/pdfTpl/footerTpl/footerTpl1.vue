<template>
  <div class="footer-main">
    <div class="operator-cont">
      <div class="operator-info margin-right">
        前端大喜子-footer tpl1
      </div>
      <div class="operator-info">联系电话：13999999999</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: '',
})
export default class extends Vue {}
</script>
<style scoped>
.footer-main {
  width: 100%;
  height: 58px;
  background: #1660b4;
  z-index: 99;
}
.footer-main .operator-cont {
  width: auto;
  display: table;
  margin: auto;
}
.operator-info {
  font-size: 16px;
  color: #fff;
  float: left;
  line-height: 58px;
}
.margin-right {
  margin-right: 48px;
}
</style>
