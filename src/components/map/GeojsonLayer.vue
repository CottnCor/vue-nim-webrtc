<template>
  <div class="geojson-layer">

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
class GeojsonLayer extends Vue {}

export default GeojsonLayer;
</script>

<style lang="scss" scoped>
.geojson-layer {
  margin: auto;
  display: flex;
}
</style>
