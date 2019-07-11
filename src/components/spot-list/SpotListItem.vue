<template>
  <div v-if="content" class="spot-list-item radius">
    <p class="primary strong primary-color">
      <i :class="content.icon"></i>
    </p>
    <p class="primary strong center">{{ content.title }}</p>
    <span style="flex: 1;" />
    <el-button class="motion" type="text" size="mini" round>上传<i class="el-icon-upload el-icon--right"></i></el-button>
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
.spot-list-item {
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
    margin: auto 0.1em;
    padding: 0 $size_12;
  }
}
</style>