<template>
  <div class="container">

    <div v-if="this.status === 0" class="full">
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

      <i v-if="this.status === 1" class="el-icon-s-flag" size="large" style="margin:auto;"></i>

      <div v-if="this.status === 2" class="middle popup radius">
        <div class="radius">
          <slot name="middle"></slot>
        </div>
      </div>

      <div v-if="this.status === 2" class="bottom popup radius">
        <div class="radius">
          <slot name="bottom"></slot>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang='ts'>
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import { Getter, Action, namespace } from "vuex-class";

const store = namespace("Common");

@Component({})
class SketchLayout extends Vue {
  @store.Getter("status")
  private status!: number;

  @Watch("status", { immediate: true, deep: true })
  private onStatusChanged(val: number, oldVal: number) {}
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
  }

  .popup {
    margin: auto;
    padding: 1vw;
    z-index: $zindex_back-top;

    & > div {
      padding: 1vw;
      box-shadow: $shadow_power;
      background-color: map-get($default, glass);
    }
  }

  .top-wapper {
    width: 100%;
    display: flex;
    height: $size_64;
  }

  .top-wapper {
    .top {
      padding: 0;
      & > div {
        padding: $size_6;
        & > div {
          border: 1px dashed map-get($default, grey_4);
        }
      }
    }
  }

  .main-wapper {
    flex: 1;
    margin: auto;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(100% - #{($size_64)});
    min-height: calc(100% - #{($size_64)});

    /* Extra small devices (phones, sm and down) */
    @media only screen and (max-width: map-get($breakpoint, sm)) {
      & {
        flex-direction: column;
      }
    }

    /* Small devices (portrait tablets and large phones, sm and up) */
    @media only screen and (min-width: map-get($breakpoint, sm)) {
      & {
        flex-direction: column;
      }
    }

    /* Medium devices (landscape tablets, md and up) */
    @media only screen and (min-width: map-get($breakpoint, md)) {
      & {
        flex-direction: row;
      }
    }

    /* Large devices (laptops/desktops, lg and up) */
    @media only screen and (min-width: map-get($breakpoint, lg)) {
      & {
        flex-direction: row;
      }
    }

    /* Extra large devices (large laptops and desktops, xl and up) */
    @media only screen and (min-width: map-get($breakpoint, xl)) {
      & {
        flex-direction: row;
      }
    }
  }
}
</style>