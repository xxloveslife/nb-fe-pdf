<template>
  <div class="step-wraper" :class="[getStyle]">
    <div class="step">
      <el-steps direction="vertical" finish-status="success" :active="active">
        <el-step title="绘制页面"></el-step>
        <el-step title="文件转译"></el-step>
        <el-step title="下载进度"></el-step>
      </el-steps>
    </div>
    <div class="process-wraper">
      <el-progress :percentage="percentage"></el-progress>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: '',
})
export default class extends Vue {
  @Prop({ default: '160px' }) height!: string
  @Prop({ default: 0 }) percentage!: number
  @Prop({ default: 0 }) active!: number
  @Prop({ default: 0 }) show!: number
  statusObj = {
    0: 'init',
    1: 'showClass',
    2: 'hide',
  }
  get getStyle() {
    // @ts-ignore
    return this.statusObj[this.show]
  }
}
</script>

<style scoped>
.init {
  display: none;
}
.hide {
  display: block;
  animation: left-to-right linear 0.5s;
  transform: translateX(210px);
}
.showClass {
  display: block;
  animation: right-to-left linear 0.3s;
  transform: translateX(0px);
}
.step-wraper {
  z-index: 99;
  right: 30px;
  background-color: #fff;
  position: fixed;
  top: 260px;
  height: 170px;
  width: 160px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 14px 16px 24px 17px;
  box-sizing: border-box;
}
.step-wraper .step {
  width: 100%;
  height: 100%;
}

@keyframes right-to-left {
  0% {
    transform: translateX(180px);
  }
  100% {
    transform: translateX(0px);
  }
}
@keyframes left-to-right {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(180px);
  }
}
</style>
