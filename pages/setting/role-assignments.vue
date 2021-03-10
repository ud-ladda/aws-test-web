<template>
  <div>
    <RoleAssignmentsPanel />
  </div>
</template>

<script>
export default {
  components: {},
  fetch() {
    this.$store.dispatch(
      'roleAssignment/findByUserId',
      this.$permission.getUserId()
    )
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
<style lang="scss"></style>
