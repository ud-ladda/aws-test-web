export const state = () => ({
  userLists: [],
})

export const mutations = {
  SET_USER_LISTS(state, data) {
    state.userLists = data
  },
}

export const getters = {
  getAll(state) {
    return state.userLists
  },
}

export const actions = {
  async getAll({ commit }) {
    try {
      const response = []
      const res = await this.$repositories.rasUser.all(
        'Id,email,first_name,last_name,user_type/name',
        'user_type'
      )
      for (const user of res.data.value) {
        const { firstName, lastName, email, id } = user
        const roleAssignmentRes = await this.$repositories.roleAssignment.findById(
          id,
          'id,company_group_idId,company_idId,company_id/name,company_group_id/name',
          'company_id,company_group_id'
        )

        for (const role of roleAssignmentRes.data.value) {
          const userRoleAssignment = await this.$repositories.userRoleAssignment.findById(
            role.id,
            'user_role_idId,user_role_id/name',
            'user_role_id'
          )
          for (const userRole of userRoleAssignment.data.value) {
            const roleAssignment = {}
            roleAssignment.firstName = firstName
            roleAssignment.lastName = lastName
            roleAssignment.email = email
            roleAssignment.id = id
            roleAssignment.roleName = userRole.userRoleId.name
            response.push(roleAssignment)
          }
        }
      }
      console.log(response)
      commit('SET_USER_LISTS', res)
    } catch (error) {
      console.log(error)
    }
  },
}
