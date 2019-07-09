<template>
  <div class="wapper">
    <v-popup :content="this.content"></v-popup>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { LPopup } from "vue2-leaflet";

@Component({
  components: { LPopup }
})
class MapPopup extends Vue {
  @Prop({ default: "" })
  private content!: string;
}

export default MapPopup;
</script>

<style lang="scss" scoped>
.wapper {
}
</style>
