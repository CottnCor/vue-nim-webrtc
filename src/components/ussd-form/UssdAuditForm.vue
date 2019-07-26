<template>
  <div class="ussd-audit-form">

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { BasicForm } from "@/components";

@Component({ components: { BasicForm } })
class UssdAuditForm extends Vue {}

export default UssdAuditForm;
</script>

<style lang="scss" scoped>
.ussd-audit-form {
  margin: auto;
  display: flex;
}
</style>
