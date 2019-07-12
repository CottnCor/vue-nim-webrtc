<template>
  <div v-if="this.latLng && this.latLng.length > 0">
    <l-rotated-marker :lat-lng="this.latLng" :rotationAngle="this.rotationAngle">
      <l-icon :icon-anchor="this.staticAnchor" class-name="spin-marker">
        <div class="spin-marker no-bg">
          <img class="overstory bg" src="img/map/pin-marker.png" />
        </div>
      </l-icon>
    </l-rotated-marker>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import Vue2LeafletRotatedMarker from "vue2-leaflet-rotatedmarker";
import { LIcon } from "vue2-leaflet";
import { latLng, icon, CRS } from "leaflet";

import ProjUtil from "@/utils/projUtil";

@Component({
  components: { LIcon, "l-rotated-marker": Vue2LeafletRotatedMarker }
})
class SpinMarker extends Vue {
  @Prop({ default: [] })
  private latLng!: number[];

  @Prop({ default: 0 })
  private rotationAngle!: number;

  private staticAnchor = [0, 0];

  private get latLngfixed(): number[] {
    if (this.latLng.length > 1) {
      let latLngfixed = ProjUtil.getInstance().transform(this.latLng);
      return latLngfixed;
    } else {
      return [];
    }
  }
}
export default SpinMarker;
</script>

<style lang="scss" scoped>
.spin-marker {
  padding: 0;
  width: $size_120;
  height: $size_120;
  margin-top: -55px;
  margin-left: -55px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>