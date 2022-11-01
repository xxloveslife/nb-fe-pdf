<template>
  <div class="header-tpl-wraper">
    <slot name="header-content" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'headerTpl',
})
export default class extends Vue {}
</script>

<style scoped>
.header-tpl-wraper {
  padding-bottom: 20px;
}
</style>
