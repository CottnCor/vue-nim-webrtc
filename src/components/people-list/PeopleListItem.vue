<template>
  <div v-if="content" class="people-list-item radius">
    <el-tooltip :content="this.userState.online ? '在线' : '离线'" placement="right">
      <p :class="[this.userState.online ? 'success' : 'disable', 'primary', 'strong']"><i class="el-icon-link"></i></p>
    </el-tooltip>
    <p class="primary strong center">{{ content.title }}</p>
    <span style="flex: 1;" />
    <el-button @click="locate" class="motion" type="text" size="mini" round><i :class="[this.userState.online ? 'strong-color' : 'disable', 'el-icon-location-outline']"></i></el-button>
    <el-button @click="call" class="motion" type="text" size="mini" round><i :class="[this.userState.online ? 'primary-color' : 'disable', 'el-icon-video-camera']"></i></el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { getYxInfo, getUserState } from "@/api/face-time";

import { latLng, LatLng } from "leaflet";

import { namespace } from "vuex-class";

const faceTimeStore = namespace("FaceTime");

const mapStore = namespace("Map");

@Component({})
class PeopleListItem extends Vue {
  @Prop({ default: null })
  private content!: any;

  private interval!: number;

  private secondsConst = 10000;

  private userState: UserState = {
    userid: "",
    username: "",
    online: false,
    lat: 0.0,
    lng: 0.0
  };

  @faceTimeStore.Getter("status")
  private status!: number;

  @faceTimeStore.Action("add_times")
  private addTimes!: () => void;

  @faceTimeStore.Action("set_to")
  private setTo!: (val: any) => void;

  @mapStore.Action("set_coord")
  private setCoord!: (val: LatLng) => void;

  private locate() {
    if (this.userState.online) {
      this.setCoord(latLng(this.userState.lat, this.userState.lng));
    } else {
      this.$notify.warning({
        title: "用户已离线",
        message: "",
        duration: 10000
      });
    }
  }

  private refreshUserState() {
    getUserState({ token: this.content.token, username: this.content.title })
      .then(result => {
        if (result) {
          this.userState = {
            userid: result.id,
            username: result.username,
            online: result.online,
            lat: result.online ? result.lat : 0.0,
            lng: result.online ? result.lng : 0.0
          };
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  private call() {
    if (this.userState.online) {
      this.$confirm("即将发起视频呼叫, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        if (this.content.value) {
          getYxInfo({ username: this.content.title })
            .then(result => {
              if (result) {
                this.setTo({
                  userid: this.content.value,
                  username: this.content.title,
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

  private mounted() {
    this.refreshUserState();
    this.interval = setInterval(() => {
      this.refreshUserState();
    }, this.secondsConst);
  }

  private beforeDestroy() {
    if (this.interval) clearInterval(this.interval);
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