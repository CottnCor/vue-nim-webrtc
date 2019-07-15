<template>
  <div v-if="content" class="people-list-item radius">
    <el-tooltip :content="content.state ? '在线' : '离线'" placement="right">
      <p :class="[content.state ? 'success' : 'disable', 'primary', 'strong']"><i class="el-icon-link"></i></p>
    </el-tooltip>
    <p class="primary strong center">{{ content.title }}</p>
    <span style="flex: 1;" />
    <el-button @click="locate" class="motion" type="text" size="mini" round><i :class="[content.state ? 'strong-color' : 'disable', 'el-icon-location-outline']"></i></el-button>
    <el-button @click="call" class="motion" type="text" size="mini" round><i :class="[content.state ? 'primary-color' : 'disable', 'el-icon-video-camera']"></i></el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { getYxInfo } from "@/api/face-time";

import { latLng, LatLng } from "leaflet";

import { namespace } from "vuex-class";

const faceTimeStore = namespace("FaceTime");

const mapStore = namespace("Map");

@Component({})
class PeopleListItem extends Vue {
  @Prop({ default: null })
  private content!: any;

  @mapStore.Getter("track")
  private track!: any;

  @faceTimeStore.Getter("status")
  private status!: number;

  @faceTimeStore.Getter("to")
  private to!: any;

  @faceTimeStore.Action("add_times")
  private addTimes!: () => void;

  @faceTimeStore.Action("set_to")
  private setTo!: (val: any) => void;

  @mapStore.Action("set_coord")
  private setCoord!: (val: LatLng) => void;

  private locate() {
    if (this.content.value === this.to.userid) {
      if (this.track && this.track.currentLatLng) {
        let coord = this.track.currentLatLng;
        this.setCoord(latLng(coord[0], coord[1]));
      }
    }
  }

  private call() {
    this.$confirm("即将发起视频呼叫, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      center: true
    }).then(() => {
      if (this.content.value) {
        getYxInfo({ userid: this.content.value })
          .then(result => {
            if (result) {
              this.setTo({
                userid: this.content.value,
                username: this.content.title,
                account: result.account,
                status: result.status
              });
              this.addTimes();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
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