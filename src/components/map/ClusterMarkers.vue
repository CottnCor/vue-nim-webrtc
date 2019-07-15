<template>
  <div v-if="false">
    <l-marker v-for="marker in markers" :key="marker.index" :lat-lng="marker.latLng">
      <l-icon :icon-anchor="staticAnchor" class-name="marker">
        <div class="marker shadow-strong radius">
          <div>
            <p class="secondary pure center">{{marker.value}}</p>
          </div>
        </div>
      </l-icon>
    </l-marker>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { LMarker, LIcon } from "vue2-leaflet";
import { latLng, icon, CRS } from "leaflet";

@Component({
  components: { LIcon, LMarker }
})
class ClusterMarkers extends Vue {
  @Prop({ default: null })
  private markers!: any;

  private anchorValue = 25;

  private staticAnchor = [0, this.anchorValue];
}

export default ClusterMarkers;
</script>

<style lang="scss" scoped>
.marker {
  display: flex;
  padding: $size_2;
  width: max-content;
  height: max-content;
  border-radius: $size_max;
  background-color: map-get($default, ice);
  & > div {
    margin: auto;
    display: flex;
    padding: $size_2;
    width: max-content;
    height: max-content;
    border-radius: $size_max;
    background-image: map-get($default, linear_primary);
    p {
      margin: auto;
      width: $size_32;
      height: $size_32;
      line-height: $size_32;
      border-radius: $size_max;
      background-color: map-get($default, primary);
    }
  }
}
</style>