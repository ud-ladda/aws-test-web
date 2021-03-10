<template>
  <v-app class="bg" dark>
    <nuxt />
    <Loader />
  </v-app>
</template>

<script>
export default {
  name: 'Login',
}
</script>

<style scoped>
.bg {
  background: url('~assets/images/background/ras-bg.png') no-repeat center;
}
</style>
