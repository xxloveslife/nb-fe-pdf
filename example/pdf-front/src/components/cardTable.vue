<template>
  <div class="card-table page-splite-flag">
    <div class="card-table-top-wraper">
      <slot name="card-table-header" />
    </div>
    <div class="card-table-wraper">
      <slot name="card-table" />
    </div>
    <div class="card-table-bom-wraper">
      <slot name="card-table-footer" />
    </div>
  </div>
</template>
<style scoped>
.card-table {
  width: 100%;
  margin-bottom: 20px;
}
</style>
