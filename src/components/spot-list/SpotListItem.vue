<template>
  <div v-if="this.content" class="wapper marker shadow-strong radius action">
    <p class="h2 strong pure center ">
      <i :class="this.content.icon"></i>
    </p>
    <p class="primary strong pure center">{{ this.this.content.title }}</p>
    <span style="flex: 1;" />
    <el-button type="text" style="margin: auto 12px; padding: 4px 12px; font-size: 18px;">button</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
class SpotListItem extends Vue {
  @Prop({ default: null })
  private content!: any;
}

export default SpotListItem;
</script>

<style lang="scss" scoped>
.wapper {
}
</style>
