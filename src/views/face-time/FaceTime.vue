<template>
  <sketch-layout>
    <div slot="top"></div>
    <people-list-panel slot="left" />
    <!-- <ussd-panel slot="left" leftLabel="人员列表" righLabel="图斑列表" leftIcon="el-icon-position" righIcon="el-icon-crop">
      <people-list-panel slot="left" />
      <spot-list-panel slot="righ" />
    </ussd-panel> -->
    <div slot="right"></div>
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

