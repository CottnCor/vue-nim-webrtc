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
    height: 50%;
    width: 100%;
    box-shadow: $shadow_strong_inset;
  }
}
</style>