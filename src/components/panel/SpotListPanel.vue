<template>
  <div class="spot-list-panel">
    <div class="header">
      <spot-filter />
    </div>
    <div class="content">
      <spot-list-item v-for="(item, index) in 24" :key="index" :content="{state: item % 2 === 0, title: '图斑列表'}" />
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
.spot-list-panel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    height: $size_84;
  }

  .content {
    flex: 1;
    overflow-y: auto;
    box-shadow: $shadow_strong_inset;
    height: calc(100% - #{($size_84)});

    .spot-list-item {
      &:nth-child(odd) {
        background-color: map-get($default, grey_3);
      }
      &:nth-child(even) {
        background-color: map-get($default, grey_2);
      }
    }
  }
}
</style>
