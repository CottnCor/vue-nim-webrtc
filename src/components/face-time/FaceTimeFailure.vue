<template>
  <div class="face-time-failure">
    <p class="tips total pure">
      <i class="el-icon-loading"></i>
      <span class="center secondary pure">{{this.tips}}</span>
    </p>
    <div class="content">
      <a class="button">
        <i class="el-icon-close"></i>
        <span class="strong primary center">关闭</span>
      </a>
      <a class="button">
        <i class="el-icon-phone-outline"></i>
        <span class="strong primary center">重连</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import router from "../../route/index";

@Component({})
class FaceTimeFailure extends Vue {
  @Prop({ default: "" })
  private tips!: string;
}
export default FaceTimeFailure;
</script>

<style lang="scss" scoped>
.face-time-failure {
  margin: auto;
  display: flex;
  flex-direction: column;

  .tips {
    display: flex;
    padding: 0 $size_12 0 0;
    margin: $size_24 auto;
    flex-direction: row;
    i {
      margin: auto $size_12 auto 0;
    }
  }

  .content {
    display: flex;
    flex-direction: row;

    & > a {
      margin: auto $size_6;
    }
  }
}
</style>
