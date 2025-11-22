export function saveToken(token){
  localStorage.setItem("tl_token", token);
}

export function getToken(){
  return localStorage.getItem("tl_token");
}

export function removeToken(){
  localStorage.removeItem("tl_token");
}
