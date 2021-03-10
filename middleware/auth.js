export default async function ({
  $localStorage,
  redirect,
  route,
  store,
  $permission,
}) {
  const IGNORE_PAGE = ['login']
  const routeName = route.name
  const found = IGNORE_PAGE.find((ignoreRoute) => ignoreRoute === routeName)

  if (found) return

  checkToken(redirect, $localStorage.getAccessToken())
  await checkUserAuth(store, $permission)
}

function checkToken(redirect, accessToken) {
  if (!accessToken) {
    localStorage.clear()
    redirect('/login')
  }
}

async function checkUserAuth(store, permission) {
  const hasUserAuth = store.getters['auth/getUser']
  if (!hasUserAuth) {
    await store.dispatch('auth/getUser')
    await store.dispatch('auth/getUserRole', permission.getUserId())
  }
}
