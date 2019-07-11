<template>
  <div class="face-time-panel">
    <component :is="this.visibleState.component" :tips="this.visibleState.tips" />
    <face-time-tool />
    <face-time-info :time="this.mockTime" tips="我是一个提示" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { formatDate } from "@/utils/common";

import {
  FaceTimeInit,
  FaceTimeTool,
  FaceTimeControl,
  FaceTimeCalling,
  FaceTimeWaiting,
  FaceTimeWorking,
  FaceTimeFailure,
  FaceTimeHangup,
  FacetimeUnLogged,
  FaceTimeInfo
} from "@/components";

@Component({
  components: {
    FaceTimeInit,
    FaceTimeTool,
    FaceTimeControl,
    FaceTimeCalling,
    FaceTimeWaiting,
    FaceTimeWorking,
    FaceTimeFailure,
    FaceTimeHangup,
    FacetimeUnLogged,
    FaceTimeInfo
  }
})
class FaceTimePanel extends Vue {
  private faceTimeeStateCode = {
    unLogged: 0,
    initing: 1,
    waiting: 2,
    calling: 3,
    working: 4,
    failure: 5,
    hangup: 6
  };

  private faceTimeState = [
    {
      state: false,
      tips: "未登录",
      component: "FacetimeUnLogged",
      tag: this.faceTimeeStateCode.unLogged
    },
    {
      state: false,
      tips: "初始化中",
      component: "FaceTimeInit",
      tag: this.faceTimeeStateCode.initing
    },
    {
      state: false,
      tips: "等待接听",
      component: "FaceTimeWaiting",
      tag: this.faceTimeeStateCode.waiting
    },
    {
      state: false,
      tips: "正在呼叫",
      component: "FaceTimeCalling",
      tag: this.faceTimeeStateCode.calling
    },
    {
      state: true,
      tips: "通话中",
      component: "FaceTimeWorking",
      tag: this.faceTimeeStateCode.working
    },
    {
      state: false,
      tips: "异常",
      component: "FaceTimeFailure",
      tag: this.faceTimeeStateCode.failure
    },
    {
      state: false,
      tips: "已挂断",
      component: "FaceTimeHangup",
      tag: this.faceTimeeStateCode.hangup
    }
  ];

  private mockTime = formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");

  private switchFaceTimeState(stateCode: number) {
    for (const item of this.faceTimeState) {
      if (stateCode === item.tag) {
        item.state = true;
      } else {
        item.state = false;
      }
    }
  }

  public get visibleState(): any {
    for (const item of this.faceTimeState) {
      if (item.state) {
        item.state = true;
        return item;
      }
    }
  }
}

export default FaceTimePanel;
</script>

<style lang="scss" scoped>
.face-time-panel {
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  background-image: map-get($default, linear_primary_2);
}
</style>
