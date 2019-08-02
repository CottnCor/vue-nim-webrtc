<template>
  <div class="face-time-tool">
    <el-tooltip content="截屏" placement="left">
      <p class="primary motion" @click="startScreenShot">
        <i class="el-icon-camera-solid"></i>
      </p>
    </el-tooltip>
    <el-tooltip content="录屏" placement="left">
      <p class="primary motion" @click="startRecord">
        <i class="el-icon-video-camera-solid"></i>
      </p>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import NimCall from "@/utils/nimCall";

import { namespace } from "vuex-class";

const store = namespace("faceTime");

@Component({})
class FaceTimeTool extends Vue {
  @store.Getter("to")
  private to!: any;

  private recordState = false;

  private recordId = "";

  private startScreenShot() {
    NimCall.getInstance().startScreenShot();
  }

  private startRecord() {
    if (this.recordState) {
      NimCall.getInstance().stopRecord(this.recordId);
    } else {
      NimCall.getInstance()
        .startRecord(this.to.account)
        .then(result => {
          this.recordId = result;
        });
    }
    this.recordState = !this.recordState;
  }
}
export default FaceTimeTool;
</script>

<style lang="scss" scoped>
.face-time-tool {
  right: $size_12;
  bottom: $size_12;
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: $zindex_tooltip;

  p {
    display: flex;
    width: $size_32;
    height: $size_32;
    background-color: map-get($default, glass);

    i {
      margin: auto;
    }

    &:hover {
      background-image: map-get($default, linear_background);
      box-shadow: $shadow_strong;
    }

    &:nth-child(odd) {
      border-bottom: $size_1 dashed map-get($default, grey_4);
    }
  }
}
</style>
