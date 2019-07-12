<template>
  <a class="face-time-waiting primary button">
    <i class="el-icon-success success"></i>
    <span class="strong center">{{this.tips}}</span>
  </a>
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
.face-time-waiting {
  margin: auto;
}
</style>