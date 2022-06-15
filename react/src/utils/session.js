const LOGIN_COOKIE_NAME = 'token'
const REMEMBERED_NAME = 'remembered'


export function isAuthenticated() {
  if (localStorage.getItem(REMEMBERED_NAME) === 'true') {
    return localStorage.getItem(LOGIN_COOKIE_NAME)
  }

  return sessionStorage.getItem(LOGIN_COOKIE_NAME)
}

export function authenticateSuccess(token) {
  if (localStorage.getItem(REMEMBERED_NAME) === 'true') {
    localStorage.setItem(LOGIN_COOKIE_NAME, token)

    return
  }

  sessionStorage.setItem(LOGIN_COOKIE_NAME, token)
}

export function logout() {
  localStorage.removeItem(REMEMBERED_NAME)
  localStorage.removeItem(LOGIN_COOKIE_NAME)
  sessionStorage.removeItem(LOGIN_COOKIE_NAME)
}