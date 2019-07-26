<template>
  <div class="container">
    <div class="top-wapper">
      <div class="top popup radius">
        <div class="content radius">
          <div class="radius">
            <slot name="top"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="main-wapper">
      <div class="right popup radius">
        <div class="content radius">
          <div class="radius">
            <slot name="main"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="buttom-wapper">
      <div class="buttom popup radius">
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
import { Component, Vue } from "vue-property-decorator";
@Component({})
class CallNumberLayout extends Vue {}
export default CallNumberLayout;
</script>

<style lang='scss' scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .top-wapper,
  .main-wapper,
  .buttom-wapper {
    width: 100%;
    margin: auto;
    display: flex;
    padding: $size_12 0;
  }

  .buttom-wapper {
    height: $size_84;
  }

  .main-wapper {
    flex: 1;
    height: calc(100% - #{($size_84 * 2)});
  }

  .popup {
    width: 100%;
    height: 100%;
    margin: auto;
    display: flex;
    z-index: $zindex_dropdown;
    transition: all $ease_in_out;

    & > div {
      width: 100%;
      height: 100%;
      margin: auto;
      padding: $size_6;
      box-shadow: $shadow_strong;
      background-color: map-get($default, glass);

      & > div {
        width: 100%;
        height: 100%;
        padding: $size_6;
        border: $size_2 dashed map-get($default, grey_3);
      }
    }
  }

  .buttom-wapper {
    .popup {
      & > div {
        box-shadow: none;
        background-color: map-get($default, none);
      }
    }
  }
}
</style>