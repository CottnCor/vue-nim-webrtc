<template>
  <div class="people-list-panel">
    <div class="header">
      <people-filter />
    </div>
    <div class="content">
      <people-list-item v-for="(item, index) in 16" :key="index" :content="{state: item % 2 === 0, title: '测试人员' + index, account: '01895eb024fc48e19218a41de7d714'}" />
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
