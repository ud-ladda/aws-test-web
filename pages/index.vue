<template>
  <v-tabs v-if="isReady" background-color="#f5f5f5" icons-and-text>
    <v-tabs-slider v-show="false"></v-tabs-slider>
    <v-container class="px-0 py-0">
      <v-row no-gutters class="v-tab-parent">
        <v-tab
          class="border"
          active-class="text-decoration-underline text-secondary bg-white"
        >
          <div>Risk Board</div>
        </v-tab>
        <v-tab
          class="border"
          active-class="text-decoration-underline text-secondary bg-white"
        >
          <div>Report</div>
        </v-tab>
      </v-row>
    </v-container>
    <!-- Riskboard -->
    <v-tab-item>
      <v-divider />
      <v-container class="px-0" fluid>
        <v-container class="px-0">
          <RasFilter :filters="filters"></RasFilter>
        </v-container>
        <v-divider />
        <v-container class="px-0">
          <v-row no-gutters>
            <v-col>
              <div class="riskboard-table">
                <!-- Riskboard Title and Button -->
                <v-row class="pb-5">
                  <v-col>
                    <v-row>
                      <v-col>
                        <span class="h4 font-weight-bold">RISK ITEM BOARD</span>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col>
                    <v-row justify="end" class="flex-nowrap">
                      <v-col>
                        <RasBtn
                          x-small
                          icon="mdi-plus"
                          color="primary"
                          @click="$router.push('risk/create')"
                          >CREATE RISK</RasBtn
                        >
                      </v-col>
                      <v-col>
                        <RasBtn x-small icon="mdi-plus" color="primary"
                          >CREATE SUMMARY</RasBtn
                        >
                      </v-col>
                      <v-col>
                        <RasBtn
                          x-small
                          icon="mdi-export-variant"
                          outlined
                          color="primary"
                          >GENERATE REPORT</RasBtn
                        >
                      </v-col>
                      <v-col>
                        <RasBtn
                          x-small
                          icon="mdi-checkbox-marked-circle-outline"
                          outlined
                          :disabled="false"
                          color="primary"
                          >APPROVE ALL</RasBtn
                        >
                      </v-col>
                      <v-col>
                        <RasBtn
                          x-small
                          icon="mdi-flag-variant-outline"
                          outlined
                          :disabled="false"
                          color="primary"
                          >RISK PROFILE</RasBtn
                        >
                      </v-col>
                      <v-col>
                        <RasBtn
                          x-small
                          icon="mdi-export-variant"
                          outlined
                          color="primary"
                          >EXPORT</RasBtn
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <!-- Riskboard Table -->
                <v-data-table
                  :headers="tableHeaders"
                  :items="riskDetail"
                  disable-pagination
                  hide-default-footer
                  sort-by="id"
                  :multi-sort="true"
                  class="table-striped ras-table elevation-1 risk-table"
                >
                  <template v-slot:item.eventDescription="{ item }">
                    <div class="wrap-text">{{ item.eventDescription }}</div>
                  </template>
                  <template v-slot:item.gross="{ item }">
                    <HeatmapIndicator
                      :likelihood-level="item.gross.likelihood"
                      :impact-level="item.gross.impact"
                    />
                  </template>
                  <template v-slot:item.net="{ item }">
                    <HeatmapIndicator
                      :likelihood-level="item.net.likelihood"
                      :impact-level="item.net.impact"
                    />
                  </template>
                  <template v-slot:item.workflowStatus="{ item }">
                    <div class="wrap-text">
                      {{ item.workflowStatus.status }}
                      <br />
                      {{ item.workflowStatus.role }}
                    </div>
                  </template>
                  <template v-slot:item.mitigationPlans="{ item }">
                    <div class="wrap-text">
                      {{ getMitigationPlans(item.mitigationPlans) }}
                    </div>
                  </template>
                  <template v-slot:item.createdAt="{ item }">
                    <div>{{ item.createdAt | dateFilter }}</div>
                  </template>
                  <template
                    v-if="$permission.isInternalOwner()"
                    v-slot:item.actions="{ item }"
                  >
                    <v-icon
                      class="cursor-pointer"
                      small
                      color="green"
                      @click="approve(item)"
                      >mdi-check</v-icon
                    >
                    <v-icon
                      class="cursor-pointer"
                      color="error"
                      small
                      @click="reject(item)"
                      >mdi-close</v-icon
                    >
                  </template>
                  <template v-else v-slot:item.actions="{ item }">
                    <v-icon
                      color="primary"
                      small
                      class="mr-2"
                      @click="editRisk(item)"
                      >mdi-pencil</v-icon
                    >
                    <v-icon small @click="deleteGroup(item)">mdi-delete</v-icon>
                  </template>
                </v-data-table>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-tab-item>
    <!-- Report -->
    <v-tab-item>
      <v-container class="px-0" fluid>
        <v-container class="px-0">
          <RasFilter :filters="filters"></RasFilter>
        </v-container>
        <v-divider />
        <v-container class="d-flex justify-end pt-8 px-0">
          <button @click="downloadPDF">
            <v-row no-gutters>
              <v-col>
                <v-icon large color="primary">mdi-download</v-icon>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <span class="font-weight-bold">Download</span>
            </v-row>
          </button>
        </v-container>
        <div ref="exportToPdf">
          <v-container class="px-0">
            <v-row>
              <v-col>
                <div>
                  <p class="headline text-center font-weight-medium">
                    การรายงานความเสี่ยง:
                    รูปแบบการรายงานความเสี่ยงสำหรับโครงการลงทุนของเอสซีจี
                  </p>
                </div>
                <div>
                  <p class="headline text-center text-black font-weight-medium">
                    (SCG Risk Dashboard Template for Investment Project Paper)
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-container class="px-0">
            <v-row>
              <v-col>
                <div>
                  <p
                    class="subtitle-1 text-center font-weight-medium text-decoration-underline"
                  >
                    GROSS RISK
                  </p>
                </div>
                <ConsequentialHeatmapTable
                  summary
                  :assesment-results="consequenceLevelGross"
                />
              </v-col>
              <v-col>
                <div>
                  <p
                    class="subtitle-1 text-center font-weight-medium text-decoration-underline"
                  >
                    NET RISK
                  </p>
                </div>
                <ConsequentialHeatmapTable
                  summary
                  :assesment-results="consequenceLevelNet"
                />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-container>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import JSpdf from 'jspdf'
import html2canvas from 'html2canvas'
import dateTime from 'dateformat'
export default {
  components: {},
  fetch() {
    this.$store.dispatch('global/setLoader', true)
    try {
      this.riskDetail = []
      this.isReady = true
    } catch (err) {
      console.log(err)
    } finally {
      this.$store.dispatch('global/setLoader', false)
    }
  },
  data() {
    return {
      riskDetail: null,
      isReady: false,
      consequenceLevelGross: [
        {
          likelihoodLevel: 4,
          impactLevel: 5,
        },
        {
          likelihoodLevel: 2,
          impactLevel: 2,
        },
        {
          likelihoodLevel: 5,
          impactLevel: 1,
        },
      ],
      consequenceLevelNet: [
        {
          likelihoodLevel: 4,
          impactLevel: 5,
        },
        {
          likelihoodLevel: 3,
          impactLevel: 4,
        },
        {
          likelihoodLevel: 2,
          impactLevel: 1,
        },
      ],
      filters: {
        toggle: true,
        itemsLeft: [
          {
            id: 1,
            name: 'company',
            title: 'Company',
            selector: [
              'CCS for Riskboard',
              'North Chain for Riskboard',
              'CCS for Inactive',
            ],
            selected: false,
          },
          {
            id: 2,
            name: 'group',
            title: 'Group',
            selector: ['Company', 'Group'],
            selected: false,
          },
          {
            id: 3,
            name: 'role',
            title: 'Role',
            selector: ['Role 1', 'Role 2'],
            selected: false,
          },
        ],
        itemsRight: [
          {
            id: 4,
            name: 'category',
            title: 'Category',
            selector: ['Category 1', 'Category 2'],
            selected: false,
          },
          {
            id: 5,
            name: 'gross',
            title: 'Gross',
            selector: ['Gross 1', 'Gross 2'],
            selected: false,
          },
          {
            id: 6,
            name: 'net',
            title: 'Net',
            selector: ['Net 1', 'Net 2'],
            selected: false,
          },
        ],
      },
      tableHeaders: [
        {
          text: 'ID',
          align: 'center',
          value: 'id',
          width: '7%',
        },
        {
          text: 'Company',
          value: 'company',
          width: '6%',
          align: 'center',
        },
        {
          text: 'Group',
          value: 'group',
          width: '5%',
          align: 'center',
        },
        {
          text: 'Category',
          value: 'category',
          width: '6%',
          align: 'center',
        },
        {
          text: 'Event Description',
          value: 'eventDescription',
          width: '12%',
          align: 'center',
        },
        {
          text: 'Mitigation Plan',
          value: 'mitigationPlans',
          width: '12%',
          align: 'center',
        },
        {
          text: 'Mitition Status',
          value: 'mititionStatus',
          width: '10%',
          align: 'center',
        },
        {
          text: 'Gross',
          value: 'gross',
          width: '5%',
          align: 'center',
        },
        {
          text: 'Net',
          value: 'net',
          width: '5%',
          align: 'center',
        },
        {
          text: 'Status',
          value: 'workflowStatus',
          width: '13%',
          align: 'center',
        },
        {
          text: 'Date Modefied',
          value: 'dateModefied',
          width: '7%',
          align: 'start',
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
          width: '7%',
          align: 'center',
        },
      ],
    }
  },
  computed: {},
  methods: {
    canEdit(risk) {
      return risk.workflowStatus.role !== this.$permission.getUserRoleName()
    },
    getMitigationPlans(item) {
      let result = ''
      item.forEach((element, index) => {
        result += `${index + 1}. ${element.title} `
      })
      return result
    },
    toggleTables() {
      this.tables.toggle = !this.tables.toggle
    },
    filteredItems(tableItems) {
      // const filterArr = tableItems.filter((tableItem) => {
      //   return this.filters.items.map((filterItem) => {
      //     if (
      //       filterItem.selected &&
      //       filterItem.selected === tableItem[filterItem.name]
      //     ) {
      //       return tableItem
      //     }
      //   })
      // })
      // console.log(filterArr)
      return tableItems
    },
    async downloadPDF() {
      const doc = new JSpdf('l', 'mm', [330, 220])
      const canvas = await html2canvas(this.$refs.exportToPdf)
      const img = canvas.toDataURL('image/jpeg', 2)
      doc.addImage(img, 'png', 0, 0, 330, 110)
      doc.save(`report-${dateTime(new Date(), 'dd-mm-yyyy')}`)
    },
    editRisk(risk) {
      this.$router.push(`risk/create?riskId=${risk.id}`)
    },
    approve(item) {
      item.is_approved = true
      item.workflowStatus.status = this.$enum.workflowStatus.complete
      item.workflowStatus.role = this.$enum.roles.internalOwner
      this.$store.dispatch('risk/update', {
        id: item.id,
        detail: item,
      })
    },
    reject() {},
  },
}
</script>
<style lang="scss">
.v-tab-parent {
  height: 100%;
  padding-top: 1rem;
}
.v-tab-child {
  height: 100%;
}
.risk-table table {
  table-layout: fixed;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.active {
  color: $primary;
  font-weight: bold;
}
</style>
