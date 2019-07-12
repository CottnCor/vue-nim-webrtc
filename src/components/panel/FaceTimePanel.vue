<template>
  <div class="face-time-panel">
    <component :is="this.visibleState.component" :tips="this.visibleState.tips" :account="this.account" :tbid="this.tbid"/>
    <face-time-tool v-if="this.visibleState.tag === this.faceTimeeStateCode.working" />
    <face-time-info v-if="this.visibleState.tag === this.faceTimeeStateCode.working" :time="this.mockTime" tips="我是一个提示" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { MAP_CENTER, NIM_CONFIG } from "@/config";

import { formatDate } from "@/utils/common";

import NimCall from "@/utils/nimCall";

import { namespace } from "vuex-class";

const store = namespace("FaceTime");

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
  private storeType = {
    status: 0,
    track: 1
  };

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
      tips: "登录",
      component: "FacetimeUnLogged",
      tag: this.faceTimeeStateCode.unLogged
    },
    {
      state: true,
      tips: "初始化中",
      component: "FaceTimeInit",
      tag: this.faceTimeeStateCode.initing
    },
    {
      state: false,
      tips: "初始化成功, 当前可以使用通话功能",
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
      state: false,
      tips: "通话中",
      component: "FaceTimeWorking",
      tag: this.faceTimeeStateCode.working
    },
    {
      state: false,
      tips: "初始化失败, 请刷新当前页面",
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

  @store.Action("set_status")
  private setStatus!: (val: number) => void;

  @store.Action("set_track")
  private setTrack!: (val: any) => void;

  @store.Getter("account")
  private account!: string;

  @Prop({ default: NIM_CONFIG.tbid })
  private tbid!: string;

  @store.Getter("times")
  private times!: number;

  @Watch("times", { immediate: true, deep: true })
  private onTimesChanged(val: number, oldVal: number) {
    if (this.account) {
      NimCall.getInstance().startCalling(this.account, this.tbid);
    }
  }

  private mockTime = formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");

  public get visibleState(): any {
    for (const item of this.faceTimeState) {
      if (item.state) {
        return item;
      }
    }
  }

  private updateState(stateCode: number) {
    for (const item of this.faceTimeState) {
      if (stateCode === item.tag) {
        item.state = true;
        this.setStatus(item.tag);
      } else {
        item.state = false;
      }
    }
  }

  private updateTrack(trackJson: string) {
    if (trackJson) {
      let track = JSON.parse(trackJson);
      this.setTrack({
        currentLatLng: [Number(track.x), Number(track.y)],
        currentAngle: Number(track.mAzimuthDeg)
      });
    } else {
      this.setTrack({
        currentLatLng: null,
        currentAngle: 0
      });
    }
  }

  private updateStore(type: number, content: any) {
    if (type === this.storeType.status) {
      this.updateState(content);
    } else if (type === this.storeType.track) {
      this.updateTrack(content);
    }
  }

  private mounted() {
    NimCall.getInstance().login(this.updateStore);
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
