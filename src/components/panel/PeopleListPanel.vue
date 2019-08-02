<template>
  <div class='people-list-panel'>
    <div class='header'>
      <people-filter :token="this.token" />
    </div>
    <div class='content' v-loading='this.loading' element-loading-background="rgba(0, 0, 0, 0)">
      <div v-if="this.peopleList && this.peopleList.length > 0">
        <people-list-item v-for='(item, index) in this.peopleList' :key='index' :content='{token: token, title: item.username, value: item.id}' />
      </div>
      <content-none v-if="!this.loading && (!this.peopleList || this.peopleList.length < 1)" tips='无APP注册用户' />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { PeopleFilter, PeopleListItem, ContentNone } from "@/components";

import { getPeopleTree } from "@/api/face-time";

import { namespace } from "vuex-class";

const store = namespace("FaceTime");

@Component({ components: { PeopleFilter, PeopleListItem, ContentNone } })
class PeopleListPanel extends Vue {
  private peopleList = [];

  private loading = true;

  @store.Getter("token")
  private token!: string;

  @store.Getter("organizationid")
  private organizationid!: string;

  @Watch("organizationid", { immediate: true, deep: true })
  private onCoordChanged(val: string, oldVal: string) {
    if (val) {
      this.loading = true;
      this.peopleList = [];
      getPeopleTree({
        token: this.token,
        organizationid: val,
        page: 1,
        limit: 999
      })
        .then(result => {
          this.loading = false;
          if (result && result.length > 0) {
            this.peopleList = result;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}

export default PeopleListPanel;
</script>

<style lang="scss" scoped>
.people-list-panel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    height: $size_42;
  }

  .content {
    width: 100%;
    overflow-y: auto;
    box-shadow: $shadow_strong_inset;
    height: calc(100% - #{($size_42)});

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
