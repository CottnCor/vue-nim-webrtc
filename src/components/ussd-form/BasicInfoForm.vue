<template>
  <div class="basic-info-form">

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { BasicForm } from "@/components";

@Component({ components: { BasicForm } })
class BasicInfoForm extends Vue {}

export default BasicInfoForm;
</script>

<style lang="scss" scoped>
.basic-info-form {
  margin: auto;
  display: flex;
}
</style>
