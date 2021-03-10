<template>
  <div>
    <v-dialog
      v-model="isActive"
      content-class="confirm-dialog"
      persistent
      width="500"
      tile
    >
      <v-card tile class="py-2">
        <v-card-title class="pt-6 pb-2 text-body-1 font-weight-regular">
          {{ title }}
        </v-card-title>
        <v-card-text>{{ bodyMessage }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <RasBtn color="primary" class="mr-6" outlined @click="onClose()">
            {{ cancelButtonMessage }}
          </RasBtn>
          <RasBtn color="primary" @click="onSubmit()">
            {{ comfirmButtonMessage }}
          </RasBtn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    bodyMessage: {
      type: String,
      default: '',
    },
    comfirmButtonMessage: {
      type: String,
      default: 'ยืนยัน',
    },
    cancelButtonMessage: {
      type: String,
      default: 'ยกเลิก',
    },
  },
  data() {
    return {
      isActiveDialog: false,
    }
  },
  methods: {
    onClose() {
      this.$emit('onClose')
    },
    onSubmit() {
      this.$emit('onSubmit')
    },
  },
}
</script>

<style lang="scss">
.confirm-dialog {
  border-radius: 0px !important;
}
</style>
