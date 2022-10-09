export function getToken () {
  return sessionStorage.getItem('Token')
}

export function setToken (token) {
  sessionStorage.setItem('Token', token)
}

export function removeToken () {
  sessionStorage.removeItem('Token')
}
