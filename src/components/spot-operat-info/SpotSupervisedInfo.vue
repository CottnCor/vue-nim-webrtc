<template>
  <div class="spot-supervised-info">
    <info-view-bar v-for="(item, index) in 24" :key="index" :content="{state: item % 2 === 0, title: '监管信息'}" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { InfoViewBar } from "@/components";

@Component({ components: { InfoViewBar } })
class SpotSupervisedInfo extends Vue {}

export default SpotSupervisedInfo;
</script>

<style lang="scss" scoped>
.spot-supervised-info {
  height: 100%;
  width: 100%;
  overflow-y: auto;

  .info-view-bar {
    &:nth-child(odd) {
      background-color: map-get($default, grey_3);
    }
    &:nth-child(even) {
      background-color: map-get($default, bg);
    }
  }
}
</style>