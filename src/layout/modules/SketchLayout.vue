<template>
  <div class="container">
    <div class="full">
      <slot name="full"></slot>
    </div>
    <div class="top-wapper">
      <div v-if="false" class="top popup radius">
        <div class="content radius">
          <div class="radius">
            <slot name="top"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="main-wapper">
      <div :class="[this.popupState[0].state ? '' : 'hide', 'left', 'popup', 'radius']">
        <div class="content radius">
          <div class="radius">
            <slot name="left"></slot>
          </div>
        </div>
        <div class="visible-controller left" @click="activatePopup(0)">
          <p class="primary vertical pure">
            <i v-if="this.popupState[0].state" class="el-icon-d-arrow-left"></i>
            <i v-else class="el-icon-arrow-right"></i>
          </p>
        </div>
      </div>
      <div style="flex: 1;"></div>
      <div style="flex: 1;"></div>
      <div :class="[this.popupState[1].state ? '' : 'hide', 'right', 'popup', 'radius']">
        <div class="visible-controller right" @click="activatePopup(1)">
          <p class="primary vertical pure">
            <i v-if="this.popupState[1].state" class="el-icon-d-arrow-right"></i>
            <i v-else class="el-icon-arrow-left"></i>
          </p>
        </div>
        <div class="content radius">
          <div class="radius">
            <slot name="right"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="buttom-wapper">
      <div v-if="false" class="buttom popup radius">
        <div class="content radius">
          <div class="radius">
            <slot name="buttom"></slot>
          </div>
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
  private popupState = [
    {
      tag: 0,
      state: true
    },
    {
      tag: 1,
      state: false
    }
  ];

  private activatePopup(tag: number) {
    for (const item of this.popupState) {
      if (tag === item.tag) {
        item.state = !item.state;
      }
    }
  }
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
  }

  .top-wapper,
  .main-wapper,
  .buttom-wapper {
    margin: auto;
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .top-wapper,
  .buttom-wapper {
    height: $size_64;
    min-height: $size_64;
  }

  .main-wapper {
    flex: 1;
    padding: 0 $size_12;
    height: calc(100vh - #{($size_64 * 2)});
    min-height: calc(100vh - #{($size_64 * 2)});
  }

  .popup {
    margin: auto;
    display: flex;
    flex-direction: row;
    z-index: $zindex_dropdown;
    transition: all $ease_in_out;

    & > div {
      margin: auto;
      cursor: pointer;
      padding: $size_6;
      box-shadow: $shadow_power;
      background-color: map-get($default, grey_2);

      & > div {
        padding: $size_6;
        border: $size_2 dashed map-get($default, grey_4);
      }
    }

    .visible-controller {
      width: $size_32;
      padding: $size_12 0;
      display: flex;
      background-color: map-get($default, primary);

      p {
        margin: auto;
      }

      &.left {
        border-radius: 0 $size_12 $size_12 0;
      }

      &.right {
        border-radius: $size_12 0 0 $size_12;
      }

      &:hover {
        background-image: map-get($default, linear_background);
        box-shadow: $shadow_strong;
      }
    }
  }

  .main-wapper {
    .popup {
      height: 96%;
      &.left {
        width: 24%;
      }
      &.right {
        width: 42%;
      }
      &.hide {
        height: 48%;
        width: 12%;
        & > div.content {
          width: 0;
          height: 0;
          opacity: 0.2;
        }
        &.left {
          margin-left: calc(#{($size_32 - $size_12)} - 12%);
        }
        &.right {
          margin-right: calc(#{($size_32 - $size_12)} - 12%);
        }
      }
      & > div.content {
        flex: 1;
        height: 100%;
        transition: all $ease_in;
        & > div {
          width: 100%;
          height: 100%;
          & > div {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>