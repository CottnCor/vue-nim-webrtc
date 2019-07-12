<template>
  <div class="panel radius">
    <basic-map ref="basicMap">
      <wkt-layer slot="wkt-layer" :wkt="this.wkt"/>
      <cluster-markers slot="cluster-markers" markers="[]" />
      <spin-marker v-if="this.track && this.track.currentLatLng" slot="spin-marker" :latLng="this.track.currentLatLng" :rotationAngle="this.track.currentAngle" />
    </basic-map>
  </div>
</template>

<script lang='ts'>
import { getPeopleCoords } from "@/api/_mock-data";

import { MAP_CENTER, MAP_BOUND } from "@/config";

import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import { namespace } from "vuex-class";

const store = namespace("FaceTime");

import { ClusterMarkers, SpinMarker, WktLayer, BasicMap } from "@/components";

@Component({
  components: {
    ClusterMarkers,
    SpinMarker,
    WktLayer,
    BasicMap
  }
})
class MapPanel extends Vue {
  public $refs!: {
    basicMap: BasicMap;
  };

  @store.Getter("track")
  private track!: any;

  private wkt = "POLYGON ((20 10, 20 50, 30 50, 30 35, 40 35, 40 50, 50 50, 50 10, 40 10, 40 25, 30 25, 30 10, 20 10))";

  @Watch("track", { immediate: true, deep: true })
  private onTrackChanged(val: any, oldVal: any) {
    if (val && val.currentLatLng) {
      this.$refs.basicMap.setCenter(val.currentLatLng);
    }
  }
}
export default MapPanel;
</script>

<style lang='scss' scoped>
.panel {
  height: 100%;
  width: 100%;
}
</style>