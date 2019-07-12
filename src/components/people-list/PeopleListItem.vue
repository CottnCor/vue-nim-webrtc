<template>

  <div v-if="content" class="people-list-item radius">
    <el-tooltip :content="content.state ? '在线' : '离线'" placement="right">
      <p :class="[content.state ? 'success' : 'disable', 'primary', 'strong']"><i class="el-icon-link"></i></p>
    </el-tooltip>
    <p class="primary strong center">{{ content.title }}</p>
    <span style="flex: 1;" />
    <el-button @click="location" class="motion" type="text" size="mini" round><i :class="[content.state ? 'primary-color' : 'disable', 'el-icon-location-outline']"></i></el-button>
    <el-button @click="call" class="motion" type="text" size="mini" round><i :class="[content.state ? 'primary-color' : 'disable', 'el-icon-video-camera']"></i></el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { namespace } from "vuex-class";

const store = namespace("FaceTime");

@Component({})
class PeopleListItem extends Vue {
  @Prop({ default: null })
  private content!: any;

  @store.Getter("status")
  private status!: number;

  @store.Action("add_times")
  private addTimes!: () => void;

  @store.Action("set_account")
  private setAccount!: (val: string) => void;

  private location() {}

  private call() {
    this.setAccount(this.content.account);
    this.$confirm("即将发起视频呼叫, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      center: true
    }).then(() => {
      this.addTimes();
    });
  }
}

export default PeopleListItem;
</script>

<style lang="scss" scoped>
.people-list-item {
  display: flex;
  padding: $size_6;
  flex-direction: row;
  border-left: $size_12 solid transparent;

  &:hover {
    box-shadow: $shadow_strong;
    border-radius: 0 $size_6 $size_6 0;
    border-color: map-get($default, primary_1);
  }

  p {
    margin: auto $size_6 auto 0;
    &.center {
      margin: auto;
    }
    &:nth-of-type(1) {
      display: inline-flex;
    }
  }

  .motion {
    height: min-content;
    padding: 0 $size_6;
  }
}
</style>