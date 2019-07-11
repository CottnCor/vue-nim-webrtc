<template>
  <div class="spot-info-basic">
    <info-view-bar v-for="(item, index) in 24" :key="index" :content="{state: item % 2 === 0, title: '图斑信息'}" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { InfoViewBar } from "@/components";

@Component({ components: { InfoViewBar } })
class SpotInfoBasic extends Vue {}

export default SpotInfoBasic;
</script>

<style lang="scss" scoped>
.spot-info-basic {
  height: 100%;
  width: 100%;
  overflow-y: auto;

  .info-view-bar {
    &:nth-child(odd) {
      background-color: map-get($default, grey_3);
    }
    &:nth-child(even) {
      background-color: map-get($default, grey_2);
    }
  }
}
</style>
