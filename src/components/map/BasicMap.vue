<template>
  <div class="map-container">
    <l-map ref="map" class="leaflet-map" :crs="crs" :zoom="zoom" :min-zoom="minZoom" :max-zoom="maxZoom" :center="center" :options="options" @update:center="centerUpdated">
      <!-- <l-tile-layer :url="defaultLayer" /> -->
      <l-tile-layer :url="imgLayer" />
      <l-tile-layer :url="iboLayer" />
      <l-tile-layer :url="ciaLayer" />
      <slot name="wkt-layer"></slot>
      <slot name="cluster-markers"></slot>
      <slot name="spin-marker"></slot>
    </l-map>
    <img class="logo-tdt" src="img/map/logo-tdt.png" />
  </div>
</template>

<script lang="ts">
import { LMap, LTileLayer, LLayerGroup, LMarker, LIcon } from "vue2-leaflet";

import { latLng, LatLng, latLngBounds, LatLngBounds, CRS } from "leaflet";

import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { namespace } from "vuex-class";

import { MAP_URL, MAP_ZOOM, MAP_CENTER, MAP_BOUND } from "@/config";

import { MapPopup } from "@/components";

const store = namespace("Common");

@Component({
  components: { BasicMap, LMap, LTileLayer, LMarker, LIcon }
})
class BasicMap extends Vue {
  private map!: any;
  private zoom = MAP_ZOOM;
  private minZoom = 0;
  private maxZoom = 18;
  private loading = false;
  private crs = CRS.EPSG3857;
  private center = latLng(MAP_CENTER.LAT, MAP_CENTER.LNG);
  private defaultLayer = MAP_URL.STREETS;
  private imgLayer = MAP_URL.IMG;
  private vecLayer = MAP_URL.VEC;
  private cavLayer = MAP_URL.CVA;
  private ciaLayer = MAP_URL.CIA;
  private iboLayer = MAP_URL.IBO;
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

  private centerUpdated() {
    console.log(this.map.getZoom());
    console.log(this.map.getCenter());
    console.log(this.map.getBounds());
  }

  public zoomIn() {
    this.map.zoomIn();
  }

  public zoomOut() {
    this.map.zoomOut();
  }

  public flyTo(center: LatLng) {
    if (center) {
      let zoom = 17;
      this.map.flyTo(center, zoom);
    }
  }

  public panTo(center: LatLng) {
    if (center) {
      let zoom = 17;
      this.map.panTo(center);
      this.map.setZoom(zoom);
    }
  }

  public getBounds(): LatLngBounds {
    return this.map.getBounds();
  }
}

export default BasicMap;
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
    width: calc(#{($size_120 + $size_20)});
    height: calc(#{($size_36 + $size_2)});
  }
}
</style>
