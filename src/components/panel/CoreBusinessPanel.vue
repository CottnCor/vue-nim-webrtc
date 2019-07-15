<template>
  <div class="panel radius">
    <div class="radius">
      <face-time-panel />
    </div>
    <div class="radius">
      <spot-operat-panel />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import { Getter, Action, namespace } from "vuex-class";

import { FaceTimePanel, SpotOperatPanel } from "@/components";

@Component({ components: { FaceTimePanel, SpotOperatPanel } })
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
    box-shadow: $shadow_strong_inset;

    &:nth-of-type(1) {
      height: 60%;
    }

    &:nth-of-type(2) {
      height: 40%
    }
  }
}
</style>