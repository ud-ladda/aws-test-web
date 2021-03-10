<template>
  <v-row>
    <v-dialog v-model="dialog" :persistent="true" max-width="300">
      <v-card>
        <div class="dialog-content pb-0">
          <div class="dialog-content-header">{{ header }}</div>
          <div>
            <p>{{ message }}</p>
          </div>
        </div>
        <v-card-actions>
          <v-row>
            <v-col class="text-right">
              <v-btn color="secondary" @click="onConfirm">Confirm</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  components: {},
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: '',
    },
    header: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    onConfirm() {
      this.$emit('onConfirm', true)
      this.$emit('onClose', false)
    },
  },
}
</script>
<style lang="scss" scoped>
.dialog-content {
  padding: 25px;
}
.dialog-content-header {
  font-size: 18px;
  font-weight: 600;
}
.dialog-content-body {
  margin: 15px 0;
}
</style>
