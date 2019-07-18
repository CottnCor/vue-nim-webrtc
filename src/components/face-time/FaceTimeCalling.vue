<template>
  <div class="face-time-calling">
    <a class="avatar button total">
      <i class="el-icon-user-solid"></i>
    </a>
    <p class="tips total pure">
      <i class="el-icon-loading"></i>
      <span class="center secondary pure">{{this.tips}}</span>
    </p>
    <div class="content">
      <a class="button motion" @click="this.hangup">
        <i class="el-icon-close"></i>
        <span class="strong primary center">挂断</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import NimCall from "@/utils/nimCall";

@Component({})
class FaceTimeCalling extends Vue {
  @Prop({ default: "" })
  private tips!: string;

  private hangup() {
    NimCall.getInstance().hangup();
  }
}

export default FaceTimeCalling;
</script>

<style lang="scss" scoped>
.face-time-calling {
  margin: auto;
  display: flex;
  flex-direction: column;

    .tips {
      margin: auto;
      display: flex;
      padding: 0 $size_12 0 0;
      margin: $size_24 auto;
      flex-direction: row;
      i {
        margin: auto $size_12 auto 0;
      }
    }

  .avatar {
    margin: auto;
    width: $size_64;
    height: $size_64;
    border: $size_4 solid map-get($default, primary_1);
    i {
      margin: auto;
    }
  }

  .content {
    display: flex;
    flex-direction: row;
  }
}
</style>
