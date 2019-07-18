<template>
  <div class="pagination">
    <el-pagination background layout="prev, pager, next" :total="this.total" :current-page="this.current" :page-count="12" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
class Pagination extends Vue {
  @Prop({ default: 0 })
  private total!: number;
  @Prop({ default: 0 })
  private current!: number;
}

export default Pagination;
</script>

<style lang="scss" scoped>
.pagination {
  margin: auto;
  display: flex;
  & > div {
    margin: auto;
  }
}
</style>
