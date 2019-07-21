<template>
  <div class="pagination">
    <el-pagination background layout="prev, pager, next" :total="this.total" :page-size="this.pageSize" @current-change="this.pageChanged"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";

@Component({})
class Pagination extends Vue {
  @Prop({ default: 0 })
  private total!: number;

  @Prop({ default: 0 })
  private pageSize!: number;

  @Emit()
  private pageChanged(val: number) {
    return val;
  }

  private page!: number;
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
