<template>
  <div class="main">
    <slot name="main"></slot>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
class CallNumberLayout extends Vue {}
export default CallNumberLayout;
</script>

<style lang='scss' scoped>
.main {
    width: 100%;
    min-height: 100%;
    display: flex;
    background-color: map-get($default, bg);
}
</style>