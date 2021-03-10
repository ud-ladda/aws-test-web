<template>
  <v-app-bar app clipped-left height="100">
    <v-toolbar-title
      class="d-flex align-center cursor-pointer"
      @click="$router.push('/')"
    >
      <img src="~/assets/images/logo/scg-logo.png" alt="SCG logo" />
    </v-toolbar-title>
    <div class="ml-10">
      <h2 class="font-weight-bold">Risk Assessment System</h2>
      <v-toolbar-items class="mt-2">
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.to"
          active-class="active-link"
          class="link pa-0 mr-8"
          :ripple="false"
          link
        >
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-toolbar-items>
    </div>
    <v-row v-if="userRole" style="text-align: right">
      <v-col class="pb-0" cols="12">
        <h4>{{ userRole.company.name }} : {{ userRole.companyGroup.name }}</h4>
        <h5>{{ userRole.defaultUserRole.name }}</h5>
      </v-col>
      <v-col class="pt-0">
        <span>{{ fullName }}</span>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">mdi-chevron-down</v-icon>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title class="cursor-pointer"
                >Inactive Board</v-list-item-title
              >
            </v-list-item>
            <v-list-item>
              <v-list-item-title
                class="cursor-pointer"
                @click="$router.push('/setting/role-assignments')"
                >Role Setting</v-list-item-title
              >
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="cursor-pointer" @click="logout"
                >Logout</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    fullName() {
      const user = this.$store.getters['auth/getUser']
      return user ? `${user.firstName} ${user.lastName}` : '-'
    },
    userRole() {
      return this.$store.getters['auth/getUser']
        ? this.$store.getters['auth/getUser'].defaultRoleAssignment
        : null
    },
    menuItems() {
      const defaultMenu = [
        { title: 'RISK MANAGEMENT OFFICE' },
        { title: 'RISK BOARD', to: '/' },
        { title: 'HELP', to: '/help' },
        { title: 'FAQ', to: '/faq' },
      ]
      return this.$permission.isGroupAdmin()
        ? [...defaultMenu, { title: 'ADMIN', to: '/admin' }]
        : defaultMenu
    },
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$store.commit('auth/SET_TOKEN', null)
      this.$store.commit('auth/SET_USER', null)
      this.$store.commit('auth/SET_USER_ROLE', null)
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.link {
  min-height: 0 !important;

  &::before {
    transition: 0s;
    background-color: $white !important;
  }
}
.active-link {
  color: $secondary !important;
  text-decoration: underline;
  font-weight: bold;

  &::before {
    opacity: 0 !important;
  }
}
</style>
