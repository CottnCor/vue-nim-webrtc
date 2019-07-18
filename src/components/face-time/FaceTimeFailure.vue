<template>
  <div class="face-time-failure">
    <p class="tips total pure">
      <i class="el-icon-error error"></i>
      <span class="center secondary pure">{{this.tips}}</span>
    </p>
    <div class="content">
      <a class="button motion" @click="this.refresh">
        <i class="el-icon-refresh"></i>
        <span class="strong primary center">刷新</span>
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

  private refresh() {
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
      margin: auto;
    }
  }
}
</style>
