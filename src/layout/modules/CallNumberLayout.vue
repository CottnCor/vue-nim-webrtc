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
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import { namespace } from "vuex-class";

const store = namespace("FaceTime");

@Component({})
class CallNumberLayout extends Vue {
  @store.Getter("status")
  private status!: string;

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

  @Watch("status", { immediate: true, deep: true })
  private onStatusChanged(val: number, oldVal: number) {
    if (val === 3) this.popupState[1].state = true;
  }

  private activatePopup(tag: number) {
    for (const item of this.popupState) {
      if (tag === item.tag) {
        item.state = !item.state;
      }
    }
  }
}
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
    flex-direction: row;
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
    flex-direction: row;
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
        border: $size_2 dashed map-get($default, grey_4);
      }
    }
  }

  .buttom-wapper {
    .popup {
      & > div {
        box-shadow: none;
        background-color: map-get($default, none);
        & > div {
          // border: none;
        }
      }
    }
  }
}
</style>