export const state = () => ({
  activeStatus: false,
  uploadList: [],
  isUploadDone: false,
  requestCancelSource: [],
})

export const mutations = {
  SET_ACTIVE_STATUS(state, data) {
    state.activeStatus = data
  },
  SET_UPLOAD_LIST(state, data) {
    state.uploadList = data
  },
  SET_IS_UPLOAD_DONE(state, data) {
    state.isUploadDone = data
  },
  SET_REQUEST_CANCEL_SOURCE(state, data) {
    state.requestCancelSource = data
  },
}

export const getters = {
  getActiveStatus(state) {
    return state.activeStatus
  },
  getUploadList(state) {
    return state.uploadList
  },
  getIsUploadDone(state) {
    return state.isUploadDone
  },
  getRequestCancelSource(state) {
    return state.requestCancelSource
  },
}

export const actions = {
  setActiveStatus({ commit }, data) {
    commit('SET_ACTIVE_STATUS', data)
  },
  setUploadList({ commit }, data) {
    commit('SET_UPLOAD_LIST', data)
  },
  setIsUploadDone({ commit }, data) {
    commit('SET_IS_UPLOAD_DONE', data)
  },
  setRequestCancelSource({ commit }, data) {
    commit('SET_REQUEST_CANCEL_SOURCE', data)
  },
}
