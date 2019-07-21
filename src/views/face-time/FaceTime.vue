<template>
  <face-time-layout>
    <nav-bar slot="top"></nav-bar>
    <ussd-panel slot="right" />
    <core-business-panel slot="left" />
    <flow-control-bar slot="buttom" />
  </face-time-layout>
</template>

<script lang="ts" src="./FaceTime.ts"></script>

<style lang="scss" scoped>
@import "./FaceTime.scss";
</style>

