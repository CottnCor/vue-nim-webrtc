<template>
  <div class="ussd-panel radius">
    <div class="visible-controller">
      <div v-for="item in this.visiblePanelTab" :key="item.tag" :class="[item.state ? 'active' : '', 'motion']" @click="activatePanel(item.tag)">
        <p class="primary pure">{{item.label}}</p>
      </div>
      <div v-if="this.panelState.length > this.panelMax" class="motion" @click="activatePanel(-1)">
        <p class="primary pure">
          <i v-if="this.panelSurplus" class="el-icon-d-arrow-left"></i>
          <i v-else class="el-icon-more-outline"></i>
        </p>
      </div>
    </div>
    <div class="content radius">
      <component v-if="false" :is="this.visiblePanel.component" />
      <content-none v-else :tips="`无${this.visiblePanel.label}信息`" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import { Getter, Action, namespace } from "vuex-class";

import {
  ContentNone,
  SpotInfoBasic,
  SpotMultimedia,
  SpotSupervisedInfo
} from "@/components";

@Component({
  components: { ContentNone, SpotInfoBasic, SpotMultimedia, SpotSupervisedInfo }
})
class UssdPanel extends Vue {
  private panelMax = 2;

  private panelSurplus = false;

  private panelState = [
    {
      tag: 0,
      state: true,
      label: "基本信息",
      component: "SpotInfoBasic"
    },
    {
      tag: 1,
      state: false,
      label: "外业信息",
      component: "SpotMultimedia"
    },
    {
      tag: 2,
      state: false,
      label: "审核信息",
      component: "SpotMultimedia"
    }
  ];

  private activatePanel(tag: number) {
    for (const item of this.panelState) {
      if (tag === item.tag) {
        item.state = true;
      } else {
        item.state = false;
      }
      if (tag < 0) {
        this.panelSurplus = !this.panelSurplus;
      }
    }
  }

  private get visiblePanelTab(): any {
    let tabs: any = null;
    if (this.panelSurplus) {
      tabs = this.panelState.filter((item, index) => index > this.panelMax - 1);
    } else {
      tabs = this.panelState.filter((item, index) => index < this.panelMax);
    }
    return tabs.map((item, index) => {
      if (index === 0) {
        item.state = true;
      }
      return item;
    });
  }

  private get visiblePanel(): any {
    for (const item of this.panelState) {
      if (item.state) {
        return item;
      }
    }
  }
}
export default UssdPanel;
</script>

<style lang='scss' scoped>
.ussd-panel {
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
  }

  .visible-controller {
    display: flex;
    height: $size_32;

    & > div {
      display: flex;
      margin: 0 $size_1;
      padding: 0 $size_12;
      border-radius: $size_12 $size_12 0 0;
      background-color: map-get($default, primary_light_2);

      p {
        margin: auto;
      }

      &:hover {
        background-image: map-get($default, linear_background);
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