<template>
  <div class="spot-multimedia">
    <info-view-bar v-for="(item, index) in 24" :key="index" :content="{state: item % 2 === 0, title: '现场照片'}" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { InfoViewBar } from "@/components";

@Component({ components: { InfoViewBar } })
class SpotMultimedia extends Vue {}

export default SpotMultimedia;
</script>

<style lang="scss" scoped>
.spot-multimedia {
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