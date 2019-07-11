<template>
  <div class="wapper" v-show="this.show">
    <li>
      <el-tooltip content="全图" placement="left">
        <el-button class="map-tool-item" icon="md-globe"></el-button>
      </el-tooltip>
    </li>
    <li>
      <el-tooltip content="放大一级" placement="left">
        <el-button class="map-tool-item" icon="md-globe"></el-button>
      </el-tooltip>
    </li>
    <li>
      <el-tooltip content="缩小一级" placement="left">
        <el-button class="map-tool-item" icon="md-globe"></el-button>
      </el-tooltip>
    </li>
    <li v-show="false">
      <el-tooltip content="全屏" placement="left">
        <el-button class="map-tool-item" icon="md-globe"></el-button>
      </el-tooltip>
    </li>
    <li>
      <el-tooltip content="底图切换" placement="left">
        <el-button class="map-tool-item" icon="md-globe"></el-button>
      </el-tooltip>
    </li>
    <el-popover v-if="this.map" placement="left" width="320" trigger="click">
      <collection-site :map="this.map" />
      <el-button class="map-tool-item" slot="reference" icon="el-icon-star-on"></el-button>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
class MapWidgets extends Vue {
  @Prop({ default: false })
  private show!: boolean;

  @Prop({ default: null })
  private map!: any;
}

export default MapWidgets;
</script>

<style lang="scss" scoped>
.wapper {
}
</style>
