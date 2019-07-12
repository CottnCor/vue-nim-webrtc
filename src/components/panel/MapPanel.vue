<template>
  <div class="panel radius">
    <baisc-map>
      <cluster-markers slot="cluster-markers" :markers="this.mockMarkers" />
      <spin-marker slot="spin-marker" :latLng="this.currentLatLng" :rotationAngle="this.currentAngle" />
    </baisc-map>
  </div>
</template>

<script lang='ts'>
import { getPeopleCoords } from "@/api/_mock-data";

import { MAP_CENTER, MAP_BOUND } from "@/config";

import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import { Getter, Action, namespace } from "vuex-class";

import { ClusterMarkers, SpinMarker, BaiscMap } from "@/components";

@Component({
  components: {
    ClusterMarkers,
    SpinMarker,
    BaiscMap
  }
})
class MapPanel extends Vue {
  private interval!: number;

  private mockMarkers = [];

  private currentLatLng = [MAP_CENTER.LAT, MAP_CENTER.LNG];

  private currentAngle = 135;

  private mounted() {
    this.interval = setInterval(() => {
      this.currentAngle = Math.floor(Math.random() * (360 - 0) + 0);
    }, 1000);
  }

  private beforeDestroy() {
    if (this.interval) clearInterval(this.interval);
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