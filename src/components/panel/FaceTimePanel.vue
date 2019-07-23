<template>
  <div class="face-time-panel">
    <component v-if="this.from" :is="this.visibleState.component" :tips="this.visibleState.tips" :from="this.from" :to="this.to" :updateStore="this.updateStore" />
    <face-time-failure v-else tips="未挂接通话账号" />
    <face-time-tool v-if="this.visibleState.tag === this.faceTimeeStateCode.working" />
    <face-time-info v-if="this.visibleState.tag === this.faceTimeeStateCode.working" :time="this.mockTime" :tips="this.visibleState.tips" :from="this.from" :to="this.to" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { MAP_CENTER, MAX_PANTO_TIMES } from "@/config";

import { formatDate } from "@/utils/common";

import NimCall from "@/utils/nimCall";

import { namespace } from "vuex-class";
import CallNumber from "../../views/call-number/CallNumber";

const faceTimeStore = namespace("FaceTime");

const mapStore = namespace("Map");

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
      tips: "刷新",
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

  private mockTime = formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");

  @faceTimeStore.Action("set_status")
  private setStatus!: (val: number) => void;

  @mapStore.Action("set_panto")
  private setPanto!: (val: number) => void;

  @mapStore.Action("set_track")
  private setTrack!: (val: any) => void;

  @faceTimeStore.Getter("status")
  private status!: number;

  @faceTimeStore.Getter("from")
  private from!: any;

  @faceTimeStore.Getter("to")
  private to!: any;

  @faceTimeStore.Getter("callnumber")
  private callnumber!: string;

  @Watch("status", { immediate: true, deep: true })
  private onStatusChanged(val: number, oldVal: number) {
    if (val !== this.faceTimeeStateCode.working) {
      this.setTrack(null);
      this.setPanto(MAX_PANTO_TIMES);
    } else {
      this.setPanto(0);
    }

    if(val === this.faceTimeeStateCode.waiting){
      if (this.from && this.to) {
        NimCall.getInstance().startCalling(this.to, this.callnumber);
      }
    }
  }

  @Watch("from", { immediate: true, deep: true })
  private onFromChanged(val: any, oldVal: any) {
    if (val) {
      NimCall.getInstance().login(this.updateStore, val.account, val.token);
    }
  }

  private get visibleState(): any {
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
    if (trackJson && this.status === this.faceTimeeStateCode.working) {
      let track = JSON.parse(trackJson);
      this.setTrack({
        currentLatLng: [Number(track.y), Number(track.x)],
        currentAngle: Number(track.mAzimuthDeg)
      });
    } else {
      this.setTrack(null);
    }
  }

  private updateStore(type: number, content: any) {
    if (type === this.storeType.status) {
      this.updateState(content);
    } else if (type === this.storeType.track) {
      this.updateTrack(content);
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
  margin-right: $size_2;
  background-image: map-get($default, linear_primary_2);
}
</style>
