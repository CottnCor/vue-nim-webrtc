<template>
  <div v-if="this.content" class="people-list-item radius">
    <el-tooltip :content="this.content.online ? '在线' : '离线'" placement="right">
      <p :class="[this.content.online ? 'success' : 'disable', 'primary', 'strong']"><i class="el-icon-link"></i></p>
    </el-tooltip>
    <p class="primary strong center">{{ this.content.username }}</p>
    <span style="flex: 1;" />
    <el-button @click="locate" class="motion" type="text" size="mini" round><i :class="[this.content.online ? 'strong-color' : 'disable', 'el-icon-location-outline']"></i></el-button>
    <el-button @click="call" class="motion" type="text" size="mini" round><i :class="[this.content.online ? 'primary-color' : 'disable', 'el-icon-video-camera']"></i></el-button>
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
  private content!: UserState;

  @faceTimeStore.Getter("token")
  private token!: string;

  @faceTimeStore.Getter("status")
  private status!: number;

  @faceTimeStore.Action("add_times")
  private addTimes!: () => void;

  @faceTimeStore.Action("set_to")
  private setTo!: (val: any) => void;

  @mapStore.Action("set_coord")
  private setCoord!: (val: LatLng) => void;

  private locate() {
    if (this.content.online) {
      this.setCoord(latLng(this.content.lat, this.content.lng));
    } else {
      this.$notify.warning({
        title: "用户已离线",
        message: "",
        duration: 10000
      });
    }
  }

  private call() {
    if (this.content.online) {
      this.$confirm("即将发起视频呼叫, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        if (this.content.userid) {
          getYxInfo({ username: this.content.username })
            .then(result => {
              if (result) {
                this.setTo({
                  userid: this.content.userid,
                  username: this.content.username,
                  account: result.account
                });
                this.addTimes();
              } else {
                this.$notify.error({
                  title: "未能成功发起视频",
                  message: "该用户未登录过APP",
                  duration: 10000
                });
              }
            })
            .catch(err => {
              console.log(err);
              this.$notify.error({
                title: "未能成功发起视频",
                message: "该用户未登录过APP",
                duration: 0
              });
            });
        }
      });
    } else {
      this.$notify.warning({
        title: "未能成功发起视频",
        message: "用户已离线",
        duration: 10000
      });
    }
  }
}

interface UserState {
  userid: string;
  username: string;
  online: boolean;
  lat: number;
  lng: number;
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