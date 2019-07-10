<template>
  <div class="wapper">
    <div class="header">
      <spot-filter />
    </div>
    <div class="content">
      <spot-list-item v-for="(item, index) in 12" :key="index" :content="{icon: 'el-icon-crop', title: '图斑列表'}" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { SpotFilter, SpotListItem } from "@/components";

@Component({ components: { SpotFilter, SpotListItem } })
class SpotListPanel extends Vue {}

export default SpotListPanel;
</script>

<style lang="scss" scoped>
.wapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    height: $size_64;
  }

  .content {
    flex: 1;
    overflow-y: auto;
    max-height: calc(100% - #{($size_64)});
  }
}
</style>
