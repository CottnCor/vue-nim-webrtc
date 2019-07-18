<template>
  <map-sketch-layout>
    <div slot="top"></div>
    <ussd-panel slot="left" />
    <core-business-panel slot="right" />
    <map-panel slot="full" />
  </map-sketch-layout>
</template>

<script lang="ts" src="./FaceTime.ts"></script>

<style lang="scss" scoped>
@import "./FaceTime.scss";
</style>

