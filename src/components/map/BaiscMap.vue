<template>
  <div class="map-container">
    <l-map ref="map" class="leaflet-map" :zoom="zoom" :min-zoom="minZoom" :max-zoom="maxZoom" :crs="crs" :maxBounds="maxBounds" :center="center" :options="options" @update:center="centerUpdated">
      <l-tile-layer :url="imgLayer" />
      <l-tile-layer :url="wapperLayer" />
      <l-tile-layer :url="labelLayer" />
      <slot name="cluster-markers"></slot>
      <slot name="spin-marker"></slot>
    </l-map>
    <img class="logo-tdt" src="img/map/logo-tdt.png" />
  </div>
</template>

<script lang="ts">
import { LMap, LTileLayer, LLayerGroup, LMarker, LIcon } from "vue2-leaflet";

import { latLng, latLngBounds, CRS } from "leaflet";

import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { namespace } from "vuex-class";

import { MAP_URL, MAP_CENTER, MAP_BOUND } from "@/config";

const store = namespace("Common");

@Component({
  components: { BaiscMap, LMap, LTileLayer, LMarker, LIcon }
})
class BaiscMap extends Vue {
  private interval?: any;
  private map?: any;
  private zoom = 6;
  private minZoom = 5;
  private maxZoom = 18;
  private loading = false;
  private crs = CRS.EPSG3857;
  private center = latLng(MAP_CENTER.LAT, MAP_CENTER.LNG);
  private imgLayer = MAP_URL.IMG;
  private vecLayer = MAP_URL.VEC;
  private cavLayer = MAP_URL.CVA;
  private boundaryUrl = MAP_URL.BOUNDARY;
  private wapperLayer = MAP_URL.WAPPER;
  private labelLayer = MAP_URL.LABEL;
  private maxBounds = latLngBounds(
    latLng(MAP_BOUND.MAX_LAT, MAP_BOUND.MAX_LNG),
    latLng(MAP_BOUND.MIN_LAT, MAP_BOUND.MIN_LNG)
  );
  private options = {
    zoomControl: false,
    attributionControl: false
  };

  private activated() {}

  private mounted() {
    this.init();
  }

  private beforeDestroy() {}

  private init() {
    this.map = (this.$refs.map as LMap).mapObject;
  }

  private zoomIn() {
    this.map.zoomIn();
  }

  private zoomOut() {
    this.map.zoomOut();
  }

  private centerUpdated() {
    console.log(this.map.getZoom());
    console.log(this.map.getCenter());
    console.log(this.map.getBounds());
  }
}

export default BaiscMap;
</script>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;

  .leaflet-map {
    cursor: move;
    height: 100%;
    width: 100%;
    text-align: left;
  }

  .logo-tdt {
    z-index: 1000;
    position: absolute;
    bottom: $size_10;
    left: $size_16;
    width: calc(#{($size_120 + size_20)});
    height: calc(#{($size_36 + size_2)});
  }
}
</style>
