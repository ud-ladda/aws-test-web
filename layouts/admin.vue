<template>
  <v-app dark>
    <v-navigation-drawer clipped app permanent>
      <v-list class="mt-4">
        <v-list-group
          v-for="(item, index) in menuItems"
          :key="index"
          v-model="item.active"
          no-action
          class="mb-2"
          :ripple="false"
          active-class="text-secondary"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                :class="{
                  'font-weight-bold text-decoration-underline': item.active,
                }"
              >
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(subItem, i) in item.subMenuItems"
            :key="i"
            link
            :to="subItem.path"
            active-class="font-weight-bold text-secondary custom-nav-item"
            class="my-2 pl-10"
            :ripple="false"
          >
            <v-list-item-title>{{ subItem.title }} </v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <HeaderBar />
    <v-main>
      <Loader />
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { routerOptions } from '@/.nuxt/router'
export default {
  name: 'Admin',
  data() {
    return {
      routes: routerOptions.routes,
      menuItems: [
        {
          category: 'user',
          title: 'User Information',
          subMenuItems: [
            { title: 'View User', path: '/admin/user/view' },
            { title: 'Add User', path: '/admin/user/add' },
          ],
          active: false,
        },
        {
          category: 'group',
          title: 'Group',
          subMenuItems: [
            {
              title: 'View Group',
              path: '/admin/group/view',
            },
            {
              title: 'Add Group',
              path: '/admin/group/add',
            },
          ],
          active: false,
        },
        {
          category: 'faq',
          title: 'FAQ',
          subMenuItems: [
            { title: 'View FAQ', path: '/admin/faq/view' },
            { title: 'Add FAQ', path: '/admin/faq/add' },
          ],
          active: false,
        },
      ],
    }
  },
  computed: {},
  beforeCreate() {
    if (!this.$permission.isGroupAdmin()) {
      this.$router.back()
    }
  },
  created() {
    // Activate list category group.
    const currentCategory = this.$route.path.split('/')[2]
    const currentMenuItem = this.menuItems.find(
      (item) => item.category === currentCategory
    )

    if (currentMenuItem) {
      currentMenuItem.active = true
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.custom-nav-item {
  &::before {
    background-color: white;
  }
}
</style>
