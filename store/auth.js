export const state = () => ({
  token: null,
  user: null,
  userRole: null,
})

export const mutations = {
  SET_TOKEN(state, data) {
    state.token = data
  },
  SET_USER(state, data) {
    state.user = data
  },
  SET_USER_ROLE(state, data) {
    state.userRole = data
  },
}

export const getters = {
  getToken(state) {
    return state.token
  },
  getUser(state) {
    return state.user
  },
  getUserRole(state) {
    return state.userRole
  },
}

export const actions = {
  async login({ commit }, payload) {
    const res = await this.$repositories.auth.login(payload)

    if (res?.status === this.$enum.httpStatus.Created) {
      commit('SET_TOKEN', res.data.token)
      localStorage.setItem('access_token', res.data.token)

      await authCheck(commit, this.$repositories)
    }
  },

  async getUser({ commit }) {
    try {
      await authCheck(commit, this.$repositories)
    } catch (err) {
      console.log(err)
    }
  },

  async getUserRole({ commit }, userId) {
    try {
      const res = await this.$repositories.roleAssignment.findByUserId(userId)
      commit('SET_USER_ROLE', res.data[0])
    } catch (err) {
      console.log(err)
    }
  },
}

async function authCheck(commit, repository) {
  const userResponse = await repository.auth.check()
  if (userResponse?.status === 200) {
    commit('SET_USER', userResponse.data)
  }
}
