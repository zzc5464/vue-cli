//  模拟token

const token = 'adminKey'; // 权限
export function setToken(name){
    return localStorage.setItem(token,name);
}

export function getToken(){
    return localStorage.getItem(token);
}

export function removeToken(){
    return localStorage.setItem(token,'');
}