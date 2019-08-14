<template>
  <div class="infinite-tree flex radius">
    <el-input class="flex-full flex-center gap" placeholder="点击左侧展开树选择节点" size="small" :readonly="true" :clearable="true" v-model="tips">
      <template slot="prepend">
        <el-popover class="tree-popover flex" placement="bottom" trigger="hover" v-model="popoverVisible" @show="handlePopoverShow" @hide="handlePopoverHide">
          <el-input class="flex-full" size="small" placeholder="输入关键字进行过滤" prefix-icon="el-icon-search" :clearable="true" v-model="filter" @change="handleFilterChanged">
            <template slot="append">
              <el-tooltip class="item" effect="dark" content="全部收起" placement="right">
                <a class="flex motion icon gap" @click="packupNode"><i class="el-icon-d-caret pure"></i></a>
              </el-tooltip>
            </template>
          </el-input>
          <el-tree class="tree" :data="content" ref="tree" accordion node-key="id" @node-click="handleNodeClick" :filter-node-method="filterNode" v-loading='this.loading' element-loading-background="rgba(0, 0, 0, 0)">
            <div class="tree-node flex-row" slot-scope="{ node, data }">
              <p class="node-icon title left gap flex-center">
                <i v-if="data.level === 2" class="el-icon-more primary-color"></i>
                <i v-else-if="data.level === 3" class="el-icon-more strong-color"></i>
                <i v-else-if="data.level === 4" class="el-icon-more success"></i>
              </p>
              <p v-if="data.level === 2" class="node-label primary left gap flex-center no-wrap" style="">{{ data.name }}</p>
              <p v-else-if="data.level === 3" class="node-label primary left gap flex-center no-wrap" style="">{{ data.name }}</p>
              <p v-else-if="data.level === 4" class="node-label primary strong left gap flex-center no-wrap" style="">{{ data.name }}</p>
            </div>
          </el-tree>
          <a slot="reference" class="flex motion icon gap">
            <i v-if="popoverVisible" class="el-icon-arrow-up pure"></i>
            <i v-else class="el-icon-arrow-down pure"></i>
          </a>
        </el-popover>
      </template>
    </el-input>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import { ContentNone } from "@/components";
@Component({ components: { ContentNone } })
class InfiniteTree extends Vue {
  public $refs!: any;
  @Prop({ default: true })
  private loading!: boolean;
  @Prop({ default: null })
  private content!: any;
  private tips = "";
  private filter = "";
  private current: any;
  private popoverVisible = false;
  @Emit()
  private nodeChanged(val: any) {
    return val;
  }
  @Watch("content", { deep: true })
  private onContentChanged(val: any, oldVal: any) {
    if (val && val.length > 0) {
      this.current = val[0];
      this.tips = this.current.name;
      this.nodeChanged(this.current);
    }
  }
  private packupNode() {
    this.$refs.tree.$children.forEach(item => (item.expanded = false));
  }
  private filterNode(value, data) {
    if (!value) return true;
    return data.name.indexOf(value) !== -1;
  }
  private handleFilterChanged(value) {
    this.$refs.tree.filter(value);
  }
  private handleNodeClick(data, node, tag) {
    this.tips = data.name;
    this.current = data;
    this.nodeChanged(this.current);
    tag.expanded = !tag.expanded;
    if (!this.current.children || this.current.children.length < 1) {
      this.popoverVisible = false;
    }
  }
  private handlePopoverShow() {
    this.popoverVisible = true;
  }
  private handlePopoverHide() {
    this.popoverVisible = false;
  }
}
export default InfiniteTree;
</script>

<style lang="scss" scoped>
.infinite-tree {
  display: flex;
  .tree-popover {
    transition: all $ease_in;
    .icon {
      border-radius: $size_6 0 0 $size_6;
    }
  }
}
.tree {
  overflow-y: auto;
  margin-top: $size_12;
  max-height: $size_360;
  .tree-node {
    .node-label {
      max-width: $size_180;
    }
  }
}
</style>