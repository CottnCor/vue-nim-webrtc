<template>
  <div class="container">
    <div class="full">
      <slot name="full"></slot>
    </div>
    <div class="top-wapper">
      <div class="top popup radius">
        <div class="radius">
          <slot name="top"></slot>
        </div>
      </div>
    </div>
    <div class="main-wapper">
      <div class="left popup radius">
        <div class="radius">
          <slot name="left"></slot>
        </div>
        <el-button class="visible-controller" type="primary" plain>
          <p class="primary vertical">{{this.leftLabel}}</p>
        </el-button>
      </div>
      <div class="right popup radius">
        <el-button class="visible-controller" type="primary" plain>
          <p class="primary vertical">{{this.rightLabel}}</p>
        </el-button>
        <div class="radius">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import { Getter, Action, namespace } from "vuex-class";

@Component({})
class SketchLayout extends Vue {
  @Prop({ default: "" })
  private leftLabel!: string;

  @Prop({ default: "" })
  private rightLabel!: string;
}
export default SketchLayout;
</script>

<style lang='scss' scoped>
.container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .full {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: left;
    background-image: map-get($default, linear_primary_2);
  }

  .top-wapper,
  .main-wapper {
    margin: auto;
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .top-wapper {
    height: $size_64;
    min-height: $size_64;
  }

  .main-wapper {
    flex: 1;
    height: calc(100% - #{($size_64)});
    min-height: calc(100% - #{($size_64)});
  }

  .popup {
    margin: auto;
    display: flex;
    padding: $size_6;
    flex-direction: row;
    z-index: $zindex_dropdown;
    box-shadow: $shadow_power;
    background-color: map-get($default, glass);
    & > div {
      padding: $size_6;
      border: 1px dashed map-get($default, grey_4);
    }
  }
}
</style>