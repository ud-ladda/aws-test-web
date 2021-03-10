export const state = () => ({
  result: null,
  users: [],
  createResponse: null,
})

export const mutations = {
  SET_RESULT(state, data) {
    state.result = data
  },
  SET_CREATE_RESPONSE(state, data) {
    state.createResponse = data
  },
  SET_USERS(state, data) {
    state.users = data
  },
}

export const getters = {
  getFindResult(state) {
    return state.result
  },
  getCreateResponse(state) {
    return state.createResponse
  },
  getAll(state) {
    return state.users
  },
}

export const actions = {
  async getAll({ commit }) {
    try {
      const res = await this.$repositories.rasUser.all()
      commit('SET_USERS', res)
    } catch (error) {
      console.log(error)
    }
  },
  async findByEmail({ commit }, email) {
    try {
      const res = await this.$repositories.rasUser.findByEmail(email)
      commit('SET_RESULT', res.data)
    } catch (error) {
      console.log(error)
    }
  },
  async create({ commit }, data) {
    try {
      const res = await this.$repositories.rasUser.create(data)
      commit('SET_CREATE_RESPONSE', res)
    } catch (error) {
      console.log(error)
    }
  },
}
