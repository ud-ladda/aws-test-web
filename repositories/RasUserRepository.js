const resource = `api/v1/users`

export default (axios) => ({
  all() {
    return axios.get(`${resource}`)
  },

  findByEmail(email) {
    return axios.get(`${resource}?email=${email}`)
  },
})
