<template>
  <v-row no-gutters>
    <!-- Column Left -->
    <!-- <v-col lg="5">
      <v-row no-gutters>
        <span class="h4 font-weight-bold">CHOOSE YOUR BOARD</span>
      </v-row>
      <v-row>
        <v-col v-for="filter in filters.itemsLeft" :key="filter.id" lg="4">
          <v-row class="px-3">
            <div class="pb-1">
              <span>{{ filter.title }}</span>
            </div>
          </v-row>
          <v-row class="px-3">
            <v-select
              v-model="filter.selected"
              :items="filter.selector"
              placeholder="Please Select"
              outlined
              append-icon="mdi-chevron-down"
              dense
              persistent-hint
            ></v-select>
          </v-row>
        </v-col>
      </v-row>
    </v-col> -->
    <!-- <v-col lg="2" /> -->
    <!-- Column Right -->
    <v-col lg="5">
      <v-row no-gutters>
        <span class="h4 font-weight-bold">FILTER</span>
      </v-row>
      <v-row>
        <v-col v-for="filter in filters.itemsRight" :key="filter.id" lg="4">
          <v-row class="px-3">
            <div class="pb-1">
              <span>{{ filter.title }}</span>
            </div>
          </v-row>
          <v-row class="px-3">
            <v-select
              v-model="filter.selected"
              :items="filter.selector"
              placeholder="Please Select"
              outlined
              append-icon="mdi-chevron-down"
              dense
              persistent-hint
            ></v-select>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.v-select {
  font-size: 0.9rem;
}
</style>
