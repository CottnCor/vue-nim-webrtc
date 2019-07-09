<template>
  <sketch-layout leftLabel="我是左边" rightLabel="我是右边">
    <div slot="top" style="width: 240px; height: 24px;"></div>
    <div slot="left" style="width: 240px; height: 120px;"></div>
    <div slot="right" style="width: 240px; height: 120px;"></div>
    <baisc-map slot="full">
      <cluster-markers slot="cluster-markers" :markers="mockMarkers" />
      <spin-marker slot="spin-marker" :latLng="currentLatLng" :rotationAngle="currentAngle" />
    </baisc-map>
  </sketch-layout>
</template>

<script lang="ts" src="./FaceTime.ts"></script>

<style lang="scss" scoped>
@import "./FaceTime.scss";
</style>

