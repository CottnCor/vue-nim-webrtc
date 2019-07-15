<template>
  <div class="spot-list-panel">
    <div class="header">
      <spot-filter v-if="false" />
    </div>
    <div class="content" v-if="this.spot && this.spot.length > 0">
      <spot-list-item v-for="(item, index) in this.spot" :key="index" :content="{state: item % 2 === 0, title: '测试图斑' + index}" />
    </div>
    <content-none v-else tips="未找到相关图斑" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { SpotFilter, SpotListItem, ContentNone } from "@/components";

import { namespace } from "vuex-class";

const store = namespace("Map");

@Component({ components: { SpotFilter, SpotListItem, ContentNone } })
class SpotListPanel extends Vue {
  private spot = [];
}

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
