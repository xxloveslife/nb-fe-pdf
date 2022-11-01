<template>
  <div class="footer-tpl-wraper">
    <slot name="footer-content" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'footerTpl',
})
export default class extends Vue {}
</script>

<style scoped>
.footer-tpl-wraper {
  width: 100%;
  height: 100%;
  z-index: 99 !important;
}
</style>
