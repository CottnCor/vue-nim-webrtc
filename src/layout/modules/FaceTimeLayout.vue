<template>
  <div class="container">
    <div class="top-wapper">
      <div class="top popup">
        <div class="content">
          <div class="radius">
            <slot name="top"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="main-wapper">
      <div class="left popup">
        <div class="content">
          <div class="radius">
            <slot name="left"></slot>
          </div>
        </div>
      </div>
      <div class="right popup">
        <div class="content">
          <div class="radius">
            <slot name="right"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="buttom-wapper">
      <div class="left popup">
        <div class="content">
          <div class="radius">
            <slot name="buttom-left"></slot>
          </div>
        </div>
      </div>
      <div class="right popup">
        <div class="content">
          <div class="radius">
            <slot name="buttom-right"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import { namespace } from "vuex-class";

const store = namespace("FaceTime");

@Component({})
class FaceTimeLayout extends Vue {}
export default FaceTimeLayout;
</script>

<style lang='scss' scoped>
.container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .popup {
    width: 100%;
    z-index: $zindex_dropdown;
    transition: all $ease_in_out;

    & > div {
      width: 100%;
      height: 100%;
      padding: $size_6;
      background-color: map-get($default, glass);

      & > div {
        width: 100%;
        height: 100%;
        padding: $size_6;
        border: $size_2 dashed map-get($default, grey_3);
      }
    }
  }

  .top-wapper,
  .main-wapper,
  .buttom-wapper {
    display: flex;
    width: 100%;
  }

  .top-wapper,
  .buttom-wapper {
    height: $size_64;
    .left {
      width: 58%;
    }
    .right {
      width: 42%;
    }
  }

  .main-wapper {
    flex: 1;
    height: calc(100% - #{($size_84 * 2)});
    .left {
      width: 79%;
      & > div {
        & > div {
          padding: 0;
        }
      }
    }
    .right {
      width: 21%;
    }
  }
}
</style>