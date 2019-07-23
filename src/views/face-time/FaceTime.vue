<template>
  <face-time-layout>
    <nav-bar slot="top" ></nav-bar>
    <ussd-panel slot="right" />
    <core-business-panel slot="left" />
    <spot-info-assist-bar slot="buttom-left" />
    <flow-control-bar slot="buttom-right" />
  </face-time-layout>
</template>

<script lang="ts" src="./FaceTime.ts"></script>

<style lang="scss" scoped>
@import "./FaceTime.scss";
</style>

