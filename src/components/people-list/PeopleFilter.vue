<template>
  <div class="people-filter">
    <el-dropdown class="filter">
      <span class="el-dropdown-link primary">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>1</el-dropdown-item>
        <el-dropdown-item>2</el-dropdown-item>
        <el-dropdown-item>3</el-dropdown-item>
        <el-dropdown-item disabled>4</el-dropdown-item>
        <el-dropdown-item divided>5</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown class="filter">
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>1</el-dropdown-item>
        <el-dropdown-item>2</el-dropdown-item>
        <el-dropdown-item>3</el-dropdown-item>
        <el-dropdown-item disabled>4</el-dropdown-item>
        <el-dropdown-item divided>5</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
class PeopleFilter extends Vue {}

export default PeopleFilter;
</script>

<style lang="scss" scoped>
.people-filter {
  height: 100%;
  width: 100%;
  display: flex;

  .filter {
    margin: auto $size_12 auto 0;
  }
}
</style>
