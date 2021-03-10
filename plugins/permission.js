/* eslint-disable @typescript-eslint/no-unused-vars */
export default ({ store, $enum }, inject) => {
  const { categoryExpert, assessor, internalOwner, groupAdmin } = $enum.roles

  inject('permission', {
    isRole(role) {
      return this.getUserRoleName() === role?.toLowerCase()
    },

    getUserRoleName() {
      return store.getters[
        'auth/getUser'
      ]?.defaultRoleAssignment?.defaultUserRole.name?.toLowerCase()
    },

    getUserId() {
      return store.getters['auth/getUser']?.id
    },

    isCategoryExpert() {
      return this.getUserRoleName() === categoryExpert?.toLowerCase()
    },

    isAssessor() {
      return this.getUserRoleName() === assessor?.toLowerCase()
    },

    isInternalOwner() {
      return this.getUserRoleName() === internalOwner?.toLowerCase()
    },

    isGroupAdmin() {
      return this.getUserRoleName() === groupAdmin?.toLowerCase()
    },
  })
}
