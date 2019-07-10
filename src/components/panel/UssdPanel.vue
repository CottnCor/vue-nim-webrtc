<template>
  <div class="panel radius">
    <div class="visible-controller">
      <div @click="activatePanel(0)">
        <p class="primary pure"><i :class="this.leftIcon"></i>{{this.leftLabel}}</p>
      </div>
      <div @click="activatePanel(1)">
        <p class="primary pure"><i :class="this.rightIcon"></i>{{this.rightLabel}}</p>
      </div>
    </div>
    <div class="content radius">
      <div v-if="this.panelState[0].state" class="radius">
        <slot name="left"></slot>
      </div>
      <div v-else class="radius">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import { Getter, Action, namespace } from "vuex-class";

import {} from "@/components";

@Component({})
class UssdPanel extends Vue {
  @Prop({ default: "" })
  private leftLabel!: string;

  @Prop({ default: "" })
  private rightLabel!: string;

  @Prop({ default: "" })
  private leftIcon!: string;

  @Prop({ default: "" })
  private rightIcon!: string;

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
        item.state = !item.state;
      }
    }
  }
}
export default UssdPanel;
</script>

<style lang='scss' scoped>
.panel {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  & > div {
    height: 100%;
    width: 100%;
  }

  .content {
    flex: 1;
    padding: $size_6;
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
      background-color: map-get($default, primary);

      p {
        margin: auto;
      }

      &:hover {
        background-color: map-get($default, primary_light_1);
        box-shadow: $shadow_strong;
      }
    }
  }
}
</style>