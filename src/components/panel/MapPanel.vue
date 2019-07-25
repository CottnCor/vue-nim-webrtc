<template>
  <div class="panel radius">
    <basic-map ref="basicMap">
      <wkt-layer v-for="(item, index) in this.jctb" :key="index" slot="wkt-layer" :wkt="item.wkt" />
      <cluster-markers slot="cluster-markers" markers="[]" />
      <spin-marker v-if="this.track && this.track.currentLatLng" slot="spin-marker" :latLng="this.track.currentLatLng" :rotationAngle="this.track.currentAngle" />
    </basic-map>
  </div>
</template>

<script lang='ts'>
import { latLng, LatLng } from "leaflet";

import { getVisibleJctb } from "@/api/map-api";

import { MAP_CENTER, MAP_BOUND, MAX_PANTO_TIMES } from "@/config";

import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import { namespace } from "vuex-class";

const store = namespace("Map");

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

  @store.Getter("panto")
  private panto!: number;

  @store.Getter("coord")
  private coord!: LatLng;

  @store.Action("set_coord")
  private setCoord!: (val: LatLng) => void;

  @store.Action("set_panto")
  private setPanto!: (val: number) => void;

  private wkt = [
    "POLYGON ((20 10, 20 50, 30 50, 30 35, 40 35, 40 50, 50 50, 50 10, 40 10, 40 25, 30 25, 30 10, 20 10))",
    "POLYGON ((10 10, 30 50, 70 50, 30 35, 50 35, 40 50, 50 50, 50 10, 80 10, 40 25, 30 85, 30 10, 30 10))"
  ];

  private jctb = [];

  @Watch("track", { immediate: true, deep: true })
  private onTrackChanged(val: any, oldVal: any) {
    if (val && val.currentLatLng) {
      if (this.panto < MAX_PANTO_TIMES) {
        this.setCoord(latLng(val.currentLatLng[0], val.currentLatLng[1]));
        this.setPanto(this.panto + 1);
      }
    }
  }

  @Watch("coord", { immediate: true, deep: true })
  private onCoordChanged(val: LatLng, oldVal: LatLng) {
    if (val && this.$refs.basicMap) {
      if (this.panto < 3) {
        this.$refs.basicMap.panTo(val);
      } else {
        this.$refs.basicMap.flyTo(val);
      }
      // this.visibleJctb();
    }
  }

  public visibleJctb() {
    let bounds = this.$refs.basicMap.getBounds();
    if (bounds) {
      let west = bounds.getWest();
      let south = bounds.getSouth();
      let east = bounds.getEast();
      let north = bounds.getNorth();
      getVisibleJctb({
        minx: west,
        miny: south,
        maxx: east,
        maxy: north
      })
        .then(result => {
          this.jctb = result;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
export default MapPanel;
</script>

<style lang='scss' scoped>
.panel {
  height: 100%;
  width: 100%;
  margin-left: $size_2;
}
</style>