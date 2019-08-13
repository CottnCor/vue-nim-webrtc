<template>
  <div id="app">
    <basic-layout>
      <keep-alive slot="main">
        <transition name="slide-fade">
          <router-view v-if="this.$route.meta.keepAlive" />
        </transition>
      </keep-alive>
      <transition slot="main" name="slide-fade">
        <router-view v-if="!this.$route.meta.keepAlive" />
      </transition>
    </basic-layout>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { BasicLayout } from "@/layout";
@Component({
  components: {
    BasicLayout
  }
})
export default class App extends Vue {}
</script>

<style lang='scss' scope>
#app {
  width: 100%;
  height: 100vh;
  min-height: 100vh;
}
</style>