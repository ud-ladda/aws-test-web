export default function ({ app, redirect }) {
  if (app.$localStorage.getAccessToken()) {
    redirect('/')
  }
}
