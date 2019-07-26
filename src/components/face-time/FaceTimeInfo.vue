<template>
  <div class="face-time-info">
    <p class="tips secondary pure right radius">
      <i class="el-icon-info"></i>
      <count-up :startTime="new Date().getTime()"/>
    </p>
    <p class="tips secondary pure right radius">
      <i class="el-icon-info"></i>
      <span class="right secondary pure">{{this.to.username}}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { CountUp } from "@/components";

@Component({ components: { CountUp } })
class FaceTimeInfo extends Vue {
  @Prop({ default: "" })
  private tips!: string;

  @Prop({ default: null })
  private to!: any;
}

export default FaceTimeInfo;
</script>

<style lang="scss" scoped>
.face-time-info {
  top: $size_12;
  right: $size_12;
  position: absolute;
  display: flex;
  flex-direction: column;

  .tips {
    display: flex;
    padding: 0 $size_6;
    margin: $size_2 0 $size_2 auto;
    background-image: map-get($default, linear_background);
    i {
      margin: auto $size_6;
    }
  }
}
</style>
