<template>
  <div v-if="content" class="info-view-bar radius">
    <p :class="[content.state ? 'success' : 'disable', 'primary', 'strong', 'primary-color']"><i class="el-icon-link"></i></p>
    <p class="primary strong center">{{ content.title }}</p>
    <span style="flex: 1;" />
    <el-tooltip content="定位" placement="bottom">
      <el-button class="motion" type="text" size="mini" round><i class="el-icon-location-outline"></i></el-button>
    </el-tooltip>
    <el-tooltip content="呼叫" placement="bottom">
      <el-button class="motion" type="text" size="mini" round><i class="el-icon-video-camera"></i></el-button>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
class InfoViewBar extends Vue {
  @Prop({ default: null })
  private content!: any;
}

export default InfoViewBar;
</script>

<style lang="scss" scoped>
.info-view-bar {
  display: flex;
  padding: $size_6;
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
