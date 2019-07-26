<template>
  <div class="field-note-form">

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { BasicForm } from "@/components";

@Component({ components: { BasicForm } })
class FieldNoteForm extends Vue {}

export default FieldNoteForm;
</script>

<style lang="scss" scoped>
.field-note-form {
  margin: auto;
  display: flex;
}
</style>
