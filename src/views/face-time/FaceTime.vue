<template>
  <sketch-layout>
    <div slot="top"></div>
    <ussd-panel slot="left" />
    <core-business-panel slot="right" />
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

