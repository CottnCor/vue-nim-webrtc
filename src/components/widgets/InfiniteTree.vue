<template>
  <div class="infinite-tree flex radius">
    <el-popover class="tree-popover bg flex" placement="bottom" trigger="click">
      <el-input class="flex-full" size="mini" placeholder="输入关键字进行过滤" prefix-icon="el-icon-search" v-model="this.filter" />
      <el-tree class="tree" :data="this.data" accordion node-key="id">
        <span class="tree-node flex-row bg" slot-scope="{ node, data }">
          <span class="title success center gap"><i class="el-icon-warning"></i></span>
          <span class="node-label primary strong center gap no-wrap" style="">{{ node.label }}</span>
        </span>
      </el-tree>
      <a slot="reference" class="flex motion icon gap radius"><i class="pure el-icon-s-grid"></i></a>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
@Component({})
class InfiniteTree extends Vue {
  @Prop({ default: null })
  private content!: any;
  private extended = false;
  private loading = false;
  private filter = "";
  private data = [
    {
      id: 1,
      label: "一级 1",
      children: [
        {
          id: 4,
          label: "二级 1-1",
          children: [
            {
              id: 9,
              label:
                "三级 1-1-1三级 1-1-1三级 1-1-1三级 1-1-1三级 1-1-1三级 1-1-1三级 1-1-1三级 1-1-1"
            },
            {
              id: 10,
              label: "三级 1-1-2"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      label: "一级 2",
      children: [
        {
          id: 5,
          label: "二级 2-1"
        },
        {
          id: 6,
          label: "二级 2-2"
        }
      ]
    },
    {
      id: 3,
      label: "一级 3",
      children: [
        {
          id: 7,
          label: "二级 3-1"
        },
        {
          id: 8,
          label: "二级 3-2"
        }
      ]
    }
  ];
}
export default InfiniteTree;
</script>

<style lang="scss" scoped>
.infinite-tree {
  display: flex;
  .button {
    padding: 0;
    border: none;
    background: none;
    border-radius: 0;
    &:hover {
      background: none;
      box-shadow: none;
    }
  }
  .tree-popover {
    transition: all $ease_in;
  }
}
.tree {
  margin-top: $size_12;
  .tree-node {
    .node-label {
      width: $size_120;
      max-width: $size_120;
    }
  }
}
</style>