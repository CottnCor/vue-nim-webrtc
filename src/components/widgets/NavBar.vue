<template>
  <div class="nav-bar">
    <a class="button motion" @click="this.return">
      <i class="el-icon-back pure"></i>
      <span class="strong primary center pure">返回</span>
    </a>
    <div style="margin: auto; display: flex;">
      <p class="primary strong left"><i class="el-icon-phone-outline success"></i></p>
      <p class="primary strong left">{{this.tips}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";

import { getTaskType } from "@/api/call-number";

import { formatDate } from "@/utils/common";

import { ROOT_ROUTER } from "@/config";

import NimCall from "@/utils/nimCall";

import { namespace } from "vuex-class";

const store = namespace("FaceTime");

@Component({})
class NavBar extends Vue {
  @store.Getter("token")
  private token!: string;

  @store.Getter("from")
  private from!: any;

  @store.Action("set_faceTimeId")
  private setFaceTimeId!: (val: string) => void;

  @store.Action("set_from")
  private setFrom!: (val: any) => void;

  @store.Action("set_to")
  private setTo!: (val: any) => void;

  @Prop({ default: "我是一个标题" })
  private tips!: string;

  private return() {
    this.$confirm("即将返回, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      center: true
    }).then(() => {
      if (this.token && this.from) {
        let userid = this.from.userid;
        NimCall.getInstance().hangup();
        this.setFaceTimeId("");
        this.setFrom(null);
        this.setTo(null);
        this.$router.push({
          name: ROOT_ROUTER.callNumber.name,
          query: {
            token: this.token,
            userid
          }
        });
      } else {
        this.$notify.error({
          title: "参数错误",
          message: "检查 token | userid 参数",
          duration: 0
        });
      }
    });
  }
}

export default NavBar;
</script>

<style lang="scss" scoped>
.nav-bar {
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;

  .button {
    border: none;
    margin: auto 0;
    position: absolute;
    background-color: map-get($default, primary_light_1);
  }
  p {
    margin: auto 0.2rem;
  }
}
</style>