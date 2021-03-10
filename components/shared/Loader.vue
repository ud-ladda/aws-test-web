<template>
  <div class="text-center">
    <v-overlay :value="loader" color="white" opacity="0.5" z-index="1000">
      <v-progress-circular
        indeterminate
        color="primary"
        size="60"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  computed: {
    loader() {
      return this.$store.getters['global/getLoader']
    },
  },
}
</script>
