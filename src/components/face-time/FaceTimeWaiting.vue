<template>
  <div class="wapper">

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
class FaceTimeWaiting extends Vue {
  @Prop({ default: "" })
  private tips!: string;
}

export default FaceTimeWaiting;
</script>

<style lang="scss" scoped>
.wapper {
}
</style>
