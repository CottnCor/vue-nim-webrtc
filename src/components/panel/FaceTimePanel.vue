<template>
  <div class="face-time-panel">
    <component v-if="this.from" :is="this.visibleSwitch.component" :tips="this.visibleSwitch.tips" :from="this.from" :to="this.to" :updateStore="this.updateStore" />
    <face-time-failure v-else tips="未挂接通话账号" />
    <face-time-tool v-if="this.visibleSwitch.tag === this.faceTimeeSwitchCode.working" />
    <face-time-info v-if="this.visibleSwitch.tag === this.faceTimeeSwitchCode.working" :tips="this.visibleSwitch.tips" :to="this.to" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { MAP_CENTER, MAX_PANTO_TIMES } from "@/config";

import { formatDate } from "@/utils/common";

import NimCall from "@/utils/nimCall";

import { editFaceTimeState } from "@/api/call-number";

import { namespace } from "vuex-class";

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

  private faceTimeeSwitchCode = {
    unLogged: 0,
    initing: 1,
    waiting: 2,
    calling: 3,
    working: 4,
    failure: 5,
    hangup: 6,
    timeout: 7
  };

  private faceTimeSwitch = [
    {
      switch: false,
      tips: "刷新",
      component: "FacetimeUnLogged",
      tag: this.faceTimeeSwitchCode.unLogged
    },
    {
      switch: true,
      tips: "初始化中",
      component: "FaceTimeInit",
      tag: this.faceTimeeSwitchCode.initing
    },
    {
      switch: false,
      tips: "初始化成功, 当前可以使用通话功能",
      component: "FaceTimeWaiting",
      tag: this.faceTimeeSwitchCode.waiting
    },
    {
      switch: false,
      tips: "等待对方接听",
      component: "FaceTimeCalling",
      tag: this.faceTimeeSwitchCode.calling
    },
    {
      switch: false,
      tips: "通话中",
      component: "FaceTimeWorking",
      tag: this.faceTimeeSwitchCode.working
    },
    {
      switch: false,
      tips: "初始化失败, 请刷新当前页面",
      component: "FaceTimeFailure",
      tag: this.faceTimeeSwitchCode.failure
    },
    {
      switch: false,
      tips: "已挂断",
      component: "FaceTimeHangup",
      tag: this.faceTimeeSwitchCode.hangup
    },
    {
      switch: false,
      tips: "呼叫超时, 对方未应答",
      component: "FaceTimeHangup",
      tag: this.faceTimeeSwitchCode.timeout
    }
  ];

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

  @faceTimeStore.Getter("faceTimeId")
  private faceTimeId!: string;

  @Watch("status", { immediate: true, deep: true })
  private onStatusChanged(val: number, oldVal: number) {
    if (val !== this.faceTimeeSwitchCode.working) {
      this.setTrack(null);
      this.setPanto(MAX_PANTO_TIMES);
    } else {
      this.setPanto(0);
    }

    if (val === this.faceTimeeSwitchCode.waiting) {
      if (this.from && this.to) {
        NimCall.getInstance().startCalling(this.to, this.faceTimeId);
      }
    } else if (val === this.faceTimeeSwitchCode.calling) {
      editFaceTimeState({ id: this.faceTimeId, state: 1 });
    } else if (val === this.faceTimeeSwitchCode.working) {
      editFaceTimeState({ id: this.faceTimeId, state: 2 });
    } else if (
      val === this.faceTimeeSwitchCode.hangup &&
      oldVal === this.faceTimeeSwitchCode.working
    ) {
      editFaceTimeState({ id: this.faceTimeId, state: 5 });
    }
  }

  @Watch("from", { immediate: true, deep: true })
  private onFromChanged(val: any, oldVal: any) {
    if (val) {
      NimCall.getInstance().login(this.updateStore, val.account, val.token);
    }
  }

  private get visibleSwitch(): any {
    for (const item of this.faceTimeSwitch) {
      if (item.switch) {
        return item;
      }
    }
  }

  private updateSwitch(switchCode: number) {
    for (const item of this.faceTimeSwitch) {
      if (switchCode === item.tag) {
        item.switch = true;
        this.setStatus(item.tag);
      } else {
        item.switch = false;
      }
    }
  }

  private updateTrack(trackJson: string) {
    if (trackJson && this.status === this.faceTimeeSwitchCode.working) {
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
      this.updateSwitch(content);
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
