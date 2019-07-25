<template>
  <div class="content-none radius">
    <div>
      <span style="flex: 1;" />
      <p class="warning primary strong"><i class="el-icon-warning"></i></p>
      <p class="primary strong center">{{this.tips}}</p>
      <span style="flex: 1;" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({})
class ContentNone extends Vue {
  @Prop({ default: "无相关内容" }) public tips!: string;
}
export default ContentNone;
</script>

<style lang="scss" scoped>
.content-none {
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  & > div {
    margin: auto;
    display: flex;
    padding: $size_6;
    p {
      margin: auto $size_6 auto 0;
      &.center {
        margin: auto;
      }
      &:nth-of-type(1) {
        display: inline-flex;
      }
    }
  }
}
</style>