<template>
  <p class="face-time-init total pure">
    <i class="el-icon-loading"></i>
    <span class="center secondary pure">{{this.tips}}</span>
  </p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
class FaceTimeInit extends Vue {
  @Prop({ default: "" })
  private tips!: string;
}

export default FaceTimeInit;
</script>

<style lang="scss" scoped>
.face-time-init {
  margin: auto;
  display: flex;
  padding: 0 $size_12;
  flex-direction: row;
  i {
    margin: auto $size_12;
  }
}
</style>
