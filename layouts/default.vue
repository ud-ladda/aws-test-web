<template>
  <v-app dark>
    <HeaderBar />
    <v-main class="container px-0">
      <Loader />
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Default',
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
