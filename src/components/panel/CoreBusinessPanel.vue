<template>
  <div class="panel radius">
    <div class="radius">
      <face-time-panel />
      <map-panel />
    </div>
    <div class="radius">
      <spot-operat-panel />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import { Getter, Action, namespace } from "vuex-class";

import { FaceTimePanel, SpotOperatPanel, MapPanel } from "@/components";

@Component({ components: { FaceTimePanel, SpotOperatPanel, MapPanel } })
class CoreBusinessPanel extends Vue {}
export default CoreBusinessPanel;
</script>

<style lang='scss' scoped>
.panel {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  & > div {
    width: 100%;

    &:nth-of-type(1) {
      height: 80%;
      display: flex;
      & > div {
        width: 50%;
        box-shadow: $shadow_power;
      }
    }

    &:nth-of-type(2) {
      height: 20%;
    }
  }
}
</style>