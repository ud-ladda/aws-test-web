<template>
  <v-btn
    :disabled="disable"
    v-bind="$attrs"
    class="ras-btn"
    dark
    height="36"
    :class="{ 'ras-btn-outlined': outlined }"
    v-on="$listeners"
    @click="onClick"
  >
    <v-icon v-if="icon" class="pr-2">{{ icon }}</v-icon>
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    outlined() {
      return this.$attrs.outlined !== undefined
    },
  },
  methods: {
    onClick() {
      this.$emit('onClick')
    },
  },
}
</script>

<style lang="scss" scoped>
.ras-btn {
  font-weight: bold;
  border: solid 1px rgba(0, 0, 0, 0.12);

  &-outlined {
    &:hover {
      transition: 0.5s;
      border: solid 1px;
    }

    &:disabled,
    &[disabled] {
      border: solid 1px rgba(0, 0, 0, 0.12) !important;
    }
  }

  &:disabled,
  &[disabled] {
    color: rgba(0, 0, 0, 0.38) !important;
    border: none;
  }
}
</style>
