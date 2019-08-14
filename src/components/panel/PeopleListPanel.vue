<template>
  <div class='people-list-panel'>
    <div class='header'>
      <people-filter :token="this.token" />
    </div>
    <div class='content' v-loading='this.loading' element-loading-background="rgba(0, 0, 0, 0)">
      <div v-if="this.peopleList && this.peopleList.length > 0">
        <people-list-item v-for='(item, index) in this.peopleList' :key='index' :content='item' />
      </div>
      <content-none v-if="!this.loading && (!this.peopleList || this.peopleList.length < 1)" tips='该组织下未挂接用户' />
    </div>
    <div v-if="this.peopleCount > 0" class="footer flex">
      <el-pagination background layout="prev, pager, next" pager-count="2" page-size="10" :current-page="this.currentPage" :total="this.peopleCount" @current-change="currentPageChanged" style="margin: auto;" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { PeopleFilter, PeopleListItem, ContentNone } from "@/components";

import { getPeopleTree } from "@/api/face-time";

import { namespace } from "vuex-class";

import { FREQUENCY } from "@/config";

const store = namespace("FaceTime");

@Component({ components: { PeopleFilter, PeopleListItem, ContentNone } })
class PeopleListPanel extends Vue {
  private peopleList: UserState[] = [];

  private interval!: number;

  private peopleCount = 0;

  private currentPage = 1;

  private loading = true;

  @store.Getter("token")
  private token!: string;

  @store.Getter("organizationid")
  private organizationid!: string;

  @Watch("organizationid", { immediate: true, deep: true })
  private onOrganizationidChanged(val: string, oldVal: string) {
    if (val) {
      this.currentPage = 0;
      this.currentPage = 1;
      this.loading = true;
      getPeopleTree({
        token: this.token,
        organizationid: val,
        page: 1,
        limit: 9999
      })
        .then(result => {
          this.loading = false;
          if (result && result.length > 0) {
            this.peopleCount = result.length;
          } else {
            this.peopleCount = 0;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  @Watch("currentPage", { immediate: true, deep: true })
  private onCurrentPageChanged(val: number, oldVal: number) {
    if (val > 0 && this.organizationid) {
      getPeopleTree({
        token: this.token,
        organizationid: this.organizationid,
        page: this.currentPage,
        limit: 10
      })
        .then(result => {
          if (result && result.length > 0) {
            this.peopleList = result.map(item => {
              return {
                userid: item.id,
                username: item.username,
                online: item.online,
                lat: item.online ? item.lat : 0.0,
                lng: item.online ? item.lon : 0.0
              };
            });
          } else {
            this.peopleList = [];
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  private currentPageChanged(val: number) {
    this.currentPage = val;
  }

  private mounted() {
    this.interval = setInterval(() => {
      this.onCurrentPageChanged(this.currentPage, this.currentPage);
    }, FREQUENCY.BASIC);
  }

  private beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
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
export default PeopleListPanel;
</script>

<style lang="scss" scoped>
.people-list-panel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header,
  .footer {
    padding: $size_10 0;
    height: max-content;
  }

  .footer {
    padding-bottom: 0;
  }

  .content {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    box-shadow: $shadow_base_inset;
    .people-list-item {
      &:nth-child(odd) {
        background-color: map-get($default, grey_3);
      }
      &:nth-child(even) {
        background-color: map-get($default, grey_2);
      }
    }
  }
}
</style>
