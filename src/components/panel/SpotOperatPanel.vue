<template>
  <div class="spot-operat-panel radius">
    <div class="visible-controller">
      <div :class="[this.panelState[0].state ? 'active' : '']" @click="activatePanel(0)">
        <p class="primary pure">人员列表</p>
      </div>
      <div :class="[this.panelState[1].state ? 'active' : '']" @click="activatePanel(1)">
        <p class="primary pure">图斑列表</p>
      </div>
    </div>
    <div class="content radius">
      <div v-if="this.panelState[0].state" class="radius">

      </div>
      <div v-else class="radius">

      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import { Getter, Action, namespace } from "vuex-class";

import { PeopleListPanel, SpotListPanel } from "@/components";

@Component({ components: { PeopleListPanel, SpotListPanel } })
class SpotOperatPanel extends Vue {
  private panelState = [
    {
      tag: 0,
      state: true
    },
    {
      tag: 1,
      state: false
    }
  ];

  private activatePanel(tag: number) {
    for (const item of this.panelState) {
      if (tag === item.tag) {
        item.state = true;
      } else {
        item.state = false;
      }
    }
  }
}
export default SpotOperatPanel;
</script>

<style lang='scss' scoped>
.spot-operat-panel {
  height: 100%;
  width: 100%;
  padding: $size_6;
  display: flex;
  flex-direction: column;

  & > div {
    width: 100%;
  }

  .content {
    height: calc(100% - #{($size_32)});
    & > div {
      height: 100%;
      width: 100%;
    }
  }

  .visible-controller {
    display: flex;
    height: $size_32;

    & > div {
      display: flex;
      margin: 0 $size_1;
      padding: 0 $size_12;
      border-radius: $size_12 $size_12 0 0;
      background-color: map-get($default, primary_light_1);

      p {
        margin: auto;
      }

      &:hover {
        background-color: map-get($default, primary_1);
        box-shadow: $shadow_strong;
      }

      &.active {
        background-color: map-get($default, primary);
        box-shadow: $shadow_strong;
      }
    }
  }
}
</style>