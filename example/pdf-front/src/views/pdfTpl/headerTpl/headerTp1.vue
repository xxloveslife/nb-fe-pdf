<template>
  <div class="header-container">
    <div />
    <div class="logo-wraper flex-row-between">
      <div />
      <img class="print-logo" src="./logo.png" alt="" />
    </div>
    <div class="top-line"></div>
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
.header-container {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 45px;
  box-sizing: border-box;
}
.header-container .top-line {
  width: 100%;
  height: 1px;
  background-color: #1660b4;
}
.header-container .logo-wraper {
  width: 100%;
}
.header-container .print-logo {
  width: 128px;
  height: 25px;
}
</style>
