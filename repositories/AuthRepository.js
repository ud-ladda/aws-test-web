const resource = `/api/auth`
export default (axios) => ({
  login(payload) {
    return axios.post(`${resource}/login`, payload)
  },

  check() {
    return axios.get(`${resource}/check`)
  },
})
