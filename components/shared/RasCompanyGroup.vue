<template>
  <div>
    <treeselect
      v-bind="$attrs"
      :options="companyWithGroupList"
      :value="value"
      v-on="$listeners"
    />
  </div>
</template>
<script>
import Treeselect /*, { ASYNC_SEARCH } */ from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { Treeselect },
  props: {
    value: {
      type: Object,
      default: null,
    },
  },
  async fetch() {
    await this.fetchCompanyWithGroupList()
  },
  data() {
    return {
      companyWithGroupList: [],
    }
  },
  methods: {
    async fetchCompanyWithGroupList() {
      try {
        this.$store.dispatch('global/setLoader', true)
        Promise.all([
          await this.$store.dispatch('global/setLoader', false),
          await this.$store.dispatch('companyGroup/getCompanyGroupsList'),
          await this.$store.dispatch('global/setLoader', false),
        ]).then(() => {
          const companyWithGroupList = this.$store.getters[
            'companyGroup/getCompanyGroupsList'
          ]
          this.companyWithGroupList = this.mapCompanyWithGroupList(
            companyWithGroupList
          )
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.$store.dispatch('global/setLoader', false)
      }
    },
    mapCompanyWithGroupList(companyWithGroupArray) {
      return companyWithGroupArray.map((item) => {
        return item.groups.length && item.groups
          ? {
              id: item.id,
              label: item.name,
              isDefaultExpanded: true,
              children: this.mapCompanyWithGroupList(item.groups),
            }
          : {
              id: item.id,
              label: item.name,
              isDefaultExpanded: true,
            }
      })
    },
  },
}
</script>
