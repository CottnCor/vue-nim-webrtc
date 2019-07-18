<template>
  <div class="face-time-hangup">
    <a class="avatar button total">
      <i class="el-icon-user-solid"></i>
    </a>
    <div class="content">
      <a class="button motion" @click="this.close">
        <i class="el-icon-close"></i>
        <span class="strong primary center">关闭</span>
      </a>
      <a class="button motion" @click="this.call">
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
class FaceTimeHangup extends Vue {
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
export default FaceTimeHangup;
</script>

<style lang="scss" scoped>
.face-time-hangup {
  margin: auto;
  display: flex;
  flex-direction: column;

  .avatar {
    width: $size_64;
    height: $size_64;
    margin: $size_24 auto;
    border: $size_4 solid map-get($default, primary_1);
    i {
      margin: auto;
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
