// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (app, inject) {
  inject('localStorage', {
    getAccessToken() {
      return localStorage.getItem('access_token')
    },
  })
}
