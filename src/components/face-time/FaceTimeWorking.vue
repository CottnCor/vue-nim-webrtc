<template>
  <div class="face-time-working">
    <div ref="remote-container" class="remote video-container" />
    <div ref="local-container" class="local video-container" />
    <div style="flex: 1;"></div>
    <div class="content">
      <a class="button">
        <i class="el-icon-close"></i>
        <span class="strong primary center">挂断</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
class FaceTimeWorking extends Vue {
  @Prop({ default: "" })
  private tips!: string;
}

export default FaceTimeWorking;
</script>

<style lang="scss" scoped>
.face-time-working {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .content {
    display: flex;
    height: $size_64;
    flex-direction: row;
    z-index: $zindex_dropdown;
  }

  .video-container {
    overflow: auto;
    position: absolute;

    &.local {
      width: $size_120;
      height: $size_84;
      top: $size_12;
      left: $size_12;
      box-shadow: $shadow_power;
      background-image: map-get($default, linear_primary_2);
    }

    &.remote {
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
