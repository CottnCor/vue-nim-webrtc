<template>
  <div class='people-list-panel'>
    <div class='header'>
      <people-filter v-if='false' />
    </div>
    <div class='content' v-if='this.peopleList && this.peopleList.length > 0'>
      <people-list-item v-for='(item, index) in this.peopleList' :key='index' :content='{state: true, title: item.username, value: item.id}' />
    </div>
    <content-none v-else tips='未找到相关人员' />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { PeopleFilter, PeopleListItem, ContentNone } from "@/components";

import { getPeopleTree } from "@/api/face-time";

import { namespace } from "vuex-class";

const store = namespace("FaceTime");

@Component({ components: { PeopleFilter, PeopleListItem, ContentNone } })
class PeopleListPanel extends Vue {
  @store.Getter("token")
  private token!: string;

  private peopleList = null;

  private mounted() {
    getPeopleTree({ token: this.token, page: 1, limit: 999 })
      .then(result => {
        debugger
        if (result && result.length > 0) {
          this.peopleList = result;
        }
      })
      .catch(err => {
        console.log(err);
      });
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
