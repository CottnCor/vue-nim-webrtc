<template>
  <div v-if="latLng && latLng.length > 0">
    <l-rotated-marker :lat-lng="latLngfixed" :rotationAngle="rotationAngle">
      <l-icon :icon-anchor="staticAnchor" class-name="marker">
        <div class="marker no-bg">
          <img class="overstory bg" src="img/icon/pin-marker.png" />
        </div>
      </l-icon>
    </l-rotated-marker>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Vue2LeafletRotatedMarker from "vue2-leaflet-rotatedmarker";
import { LIcon } from "vue2-leaflet";
import { latLng, icon, CRS } from "leaflet";

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
    if (this.latLng.length === 2) {
      let latLngfixed = [60 + this.latLng[0] / 2, this.latLng[1]];
      return latLngfixed;
    } else {
      return [];
    }
  }
}

export default SpinMarker;
</script>

<style lang="scss" scoped>
.wapper {
  .marker {
    padding: 0;
    width: $size_120;
    height: $size_120;
    margin-top: -$size_60;
    margin-left: -$size_60;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>