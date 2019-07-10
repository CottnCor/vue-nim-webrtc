<template>
  <div class="wapper">
    <div class="header">
      <people-filter />
    </div>
    <div class="content">
      <people-list-item v-for="(item, index) in 12" :key="index" :content="{icon: 'el-icon-position', title: '人员列表'}" />
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
.wapper {
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
    max-height: calc(100% - #{($size_64)});
  }
}
</style>
