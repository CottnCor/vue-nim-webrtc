<template>
  <div class="face-time-unLogged">
    <a class="button motion" @click="this.login">
      <i class="el-icon-thumb"></i>
      <span class="strong primary center">{{this.tips}}</span>
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import NimCall from "@/utils/nimCall";

import { namespace } from "vuex-class";

const store = namespace("FaceTime");

@Component({})
class FacetimeUnLogged extends Vue {
  @Prop({ default: "" })
  private tips!: string;

  @Prop({ default: null })
  private updateStore!: Function;

  @store.Getter("from")
  private from!: any;

  private login() {
    if (this.from && this.from.account && this.from.token) {
      NimCall.getInstance().login(this.updateStore, this.from.account, this.from.token);
    }
  }
}
export default FacetimeUnLogged;
</script>

<style lang="scss" scoped>
.face-time-unLogged {
  margin: auto;
}
</style>