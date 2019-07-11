<template>
  <div class="people-list-panel">
    <div class="header">
      <people-filter />
    </div>
    <div class="content">
      <people-list-item v-for="(item, index) in 24" :key="index" :content="{state: item % 2 === 0, title: '人员列表'}" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { PeopleFilter, PeopleListItem } from "@/components";

@Component({ components: { PeopleFilter, PeopleListItem } })
class PeopleListPanel extends Vue {}

export default PeopleListPanel;
</script>

<style lang="scss" scoped>
.people-list-panel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    height: $size_64;
  }

  .content {
    flex: 1;
    overflow-y: auto;
    box-shadow: $shadow_strong_inset;
    height: calc(100% - #{($size_64)});

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
