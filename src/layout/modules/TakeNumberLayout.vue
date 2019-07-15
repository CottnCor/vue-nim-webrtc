<template>
  <div class="main">
    <slot name="main"></slot>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
class TakeNumberLayout extends Vue {}
export default TakeNumberLayout;
</script>

<style lang='scss' scoped>
.main {
    width: 100%;
    min-height: 100%;
    display: flex;
    background: map-get($default, bg);
}
</style>