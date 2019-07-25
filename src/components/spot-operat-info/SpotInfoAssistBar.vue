<template>
  <div class="spot-info-assist-bar">
    <div style="margin: auto; display: flex;">
      <p class="primary strong left">附件数量：{{this.count}}</p>
    </div>
    <a class="button motion" @click="this.view">
      <i class="el-icon-folder-opened pure"></i>
      <span class="strong primary center pure">上传附件</span>
    </a>
    <a class="button motion" @click="this.upload">
      <i class="el-icon-view pure"></i>
      <span class="strong primary center pure">查看历史核查附件</span>
    </a>
    <span style="flex: 1;" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";

import { getTaskType } from "@/api/call-number";

import { formatDate } from "@/utils/common";

@Component({})
class SpotInfoAssistBar extends Vue {
  @Prop({ default: 0 })
  private count!: number;

  private view() {
    this.$notify.error({
      title: "无指向事件",
      message: "",
      duration: 0
    });
  }

  private upload() {
    this.$notify.error({
      title: "无指向事件",
      message: "",
      duration: 0
    });
  }
}

export default SpotInfoAssistBar;
</script>

<style lang="scss" scoped>
.spot-info-assist-bar {
  height: 100%;
  width: 100%;
  display: flex;

  & > a,
  & > div {
    margin: auto $size_12;
  }

  .button {
    border: none;
    background-color: map-get($default, grey_5);
  }

  p {
    margin: auto 0.2rem;
  }
}
</style>