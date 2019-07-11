<template>
  <div class="face-time-unLogged">
    <a class="button">
      <i class="el-icon-thumb"></i>
      <span class="strong primary center">需要登陆</span>
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import router from "../../route/index";

@Component({})
class FacetimeUnLogged extends Vue {
  @Prop({ default: "" })
  private tips!: string;
}
export default FacetimeUnLogged;
</script>

<style lang="scss" scoped>
.face-time-unLogged {
  margin: auto;
}
</style>