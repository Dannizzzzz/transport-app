function setToken(token) {
  localStorage.setItem("token", token);
}

function getToken() {
  return localStorage.getItem("token");
}

function clearToken() {
  localStorage.removeItem("token");
}

function isLogin() {
  if(getToken()) {
    return true;
  } else {
    return false;
  }
}

export { setToken, getToken, clearToken, isLogin };