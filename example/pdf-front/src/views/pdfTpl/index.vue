<template>
  <div id="print-pdf-templates">
    <div id="print-header-templates">
      <!-- 必须要加一个唯一的class print-header-tpl1 -->
      <defaultHeader class="print-pdf-tpl-header-default">
        <template #header-content>
          <headerTp1 />
        </template>
      </defaultHeader>
    </div>
    <div id="print-footer-templates">
      <!-- 必须要加一个唯一的class print-footer-tpl1 -->
      <defaultFooter class="print-pdf-tpl-footer-default">
        <template #footer-content>
          <footerTpl1 />
        </template>
      </defaultFooter>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import defaultHeader from './headerTpl/index.vue'
import headerTp1 from './headerTpl/headerTp1.vue'
import defaultFooter from './footerTpl/index.vue'
import footerTpl1 from './footerTpl/footerTpl1.vue'

@Component({
  name: 'pdfTpl',
  components: {
    defaultHeader,
    headerTp1,
    defaultFooter,
    footerTpl1,
  },
})
export default class extends Vue {}
</script>

<style scoped>
#print-pdf-templates {
  visibility: hidden;
  z-index: 9999;
  position: absolute;
  width: 100%;
  top: 200px;
  left: 0;
}
</style>
