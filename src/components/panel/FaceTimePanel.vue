<template>
  <div class="face-time-panel">

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
class FaceTimePanel extends Vue {}

export default FaceTimePanel;
</script>

<style lang="scss" scoped>
.face-time-panel {
  height: 100%;
  width: 100%;
  background-image: map-get($default, linear_primary_2);
}
</style>
