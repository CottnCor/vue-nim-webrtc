<template>
  <div class="spot-filter">
    <div>
      <el-dropdown class="filter">
        <span class="el-dropdown-link primary">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">

        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="filter">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">

        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
      <el-dropdown class="filter">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">

        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
class SpotFilter extends Vue {}

export default SpotFilter;
</script>

<style lang="scss" scoped>
.spot-filter {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  & > div {
    height: 50%;
    width: 100%;
    display: flex;

    .filter {
      margin: auto $size_12 auto 0;
    }
  }
}
</style>
