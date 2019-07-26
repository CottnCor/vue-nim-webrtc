<template>
  <div class="flow-control-bar">
    <a class="button motion" @click="this.prev">
      <i class="el-icon-d-arrow-left pure"></i>
      <span class="strong primary center pure">上一个</span>
    </a>
    <a class="button motion" @click="this.next">
      <span class="strong primary center pure">下一个</span>
      <i class="el-icon-d-arrow-right pure"></i>
    </a>
    <div style="margin: auto; display: flex;">
      <p class="primary strong left"><i class="el-icon-phone-outline success"></i></p>
      <p class="primary strong left">在线等待人数：{{this.count}}人</p>
    </div>
    <a class="button motion" @click="this.return">
      <i class="el-icon-finished pure"></i>
      <span class="strong primary center pure">结束</span>
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";

import { getTaskType } from "@/api/call-number";

import { formatDate } from "@/utils/common";

import NimCall from "@/utils/nimCall";

import { ROOT_ROUTER } from "@/config";

import { namespace } from "vuex-class";

const store = namespace("FaceTime");

@Component({})
class FlowControlBar extends Vue {
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

  @Prop({ default: 0 })
  private count!: number;

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

  private prev() {
    this.$notify.error({
      title: "无指向事件",
      message: "",
      duration: 0
    });
  }

  private next() {
    this.$notify.error({
      title: "无指向事件",
      message: "",
      duration: 0
    });
  }
}

export default FlowControlBar;
</script>

<style lang="scss" scoped>
.flow-control-bar {
  height: 100%;
  width: 100%;
  display: flex;

  .button {
    border: none;
    background-color: map-get($default, grey_5);
    &:last-of-type {
      background-color: map-get($default, primary_light_1);
    }
  }
  p {
    margin: auto 0.2rem;
  }
}
</style>