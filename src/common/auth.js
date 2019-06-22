var tokenKey = 'TOKEN_KEY';
var storage = sessionStorage;

export function getToken () {
  return storage.getItem(tokenKey);
}

export function setToken (token) {
  storage.setItem(tokenKey, token);
}

export function removeToken () {
  storage.removeItem(tokenKey);
}
