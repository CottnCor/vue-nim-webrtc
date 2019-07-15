<template>
  <div class="face-time-failure">
    <p class="tips total pure">
      <i class="el-icon-error error"></i>
      <span class="center secondary pure">{{this.tips}}</span>
    </p>
    <div class="content">
      <a class="button" @click="this.close">
        <i class="el-icon-close"></i>
        <span class="strong primary center">关闭</span>
      </a>
      <a class="button" @click="this.call">
        <i class="el-icon-phone-outline"></i>
        <span class="strong primary center">重连</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import NimCall from "@/utils/nimCall";

import { namespace } from "vuex-class";

const store = namespace("FaceTime");

@Component({})
class FaceTimeFailure extends Vue {
  @Prop({ default: "" })
  private tips!: string;

  @Prop({ default: null })
  private from!: any;

  @Prop({ default: null })
  private to!: any;

  @store.Action("set_status")
  private setStatus!: (val: number) => void;

  private call() {
    NimCall.getInstance().startCalling(this.to, "");
  }

  private close() {
    this.setStatus(2);
  }
}
export default FaceTimeFailure;
</script>

<style lang="scss" scoped>
.face-time-failure {
  margin: auto;
  display: flex;
  flex-direction: column;

  .tips {
    display: flex;
    padding: 0 $size_12 0 0;
    margin: $size_24 auto;
    flex-direction: row;
    i {
      margin: auto $size_12 auto 0;
    }
  }

  .content {
    display: flex;
    flex-direction: row;

    & > a {
      margin: auto $size_6;
    }
  }
}
</style>
