<template>
  <l-geo-json v-if="this.geojson" :geojson="this.geojson" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { LGeoJson } from "vue2-leaflet";

import Wkt from "wicket";

@Component({components: {LGeoJson}})
class WktLayer extends Vue {
  @Prop({ default: null })
  private wkt!: any;

  private geojson: any = null;

  private mounted() {
    let wicket = new Wkt.Wkt();
    wicket.read(this.wkt);
    this.geojson = wicket.toJson();
  }
}

export default WktLayer;
</script>
