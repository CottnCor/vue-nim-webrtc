<template>
  <div v-if="content" class="people-list-item radius">
    <el-tooltip :content="content.state ? '在线' : '离线'" placement="bottom">
      <p :class="[content.state ? 'success' : 'disable', 'primary', 'strong', 'primary-color']"><i class="el-icon-link"></i></p>
    </el-tooltip>
    <p class="primary strong center">{{ content.title }}</p>
    <span style="flex: 1;" />
    <el-tooltip content="定位" placement="bottom">
      <el-button class="motion" type="text" size="mini" round><i class="el-icon-location-outline"></i></el-button>
    </el-tooltip>
    <el-tooltip content="呼叫" placement="bottom">
      <el-button class="motion" type="text" size="mini" round><i class="el-icon-phone-outline"></i></el-button>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
class PeopleListItem extends Vue {
  @Prop({ default: null })
  private content!: any;
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