export default function ({ app, $axios, redirect, route }) {
  const routeName = route.name
  $axios.onRequest(() => {
    if (app.$localStorage.getAccessToken()) {
      $axios.setToken(app.$localStorage.getAccessToken(), 'Bearer')
    }
  })
  $axios.onError((error) => {
    if (error.response?.status === app.$enum.httpStatus.Unauthorized) {
      localStorage.clear()
      if (routeName !== 'login') {
        redirect('/login')
      }
    }
  })
}
