<template>
  <l-marker :lat-lng="latLng" :icon="icon">
    <l-icon class-name="marker">
      <div class="marker no-bg">
        <img class="overstory bg" src="img/icon/marker.png" />
      </div>
    </l-icon>
    <map-popup content="content"></map-popup>
  </l-marker>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { LIcon, LMarker } from "vue2-leaflet";
import { latLng, icon, CRS } from "leaflet";

import { MapPopup } from "@/components";

@Component({
  components: { LIcon, LMarker, MapPopup }
})
class PinMarker extends Vue {
  @Prop({ default: [] })
  private latLng!: number[];
}

export default PinMarker;
</script>

<style lang="scss" scoped>
.marker {
  padding: 0;
  width: $size_36;
  height: calc(#{($size_64 + $size_4)});
  margin-top: -$size_18;
  margin-left: calc(#{- ($size_64 + $size_4) / 2});
  img {
    width: 100%;
    height: 100%;
  }
}
</style>