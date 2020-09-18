import request from '@/utils/request'
//登录
export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}
//获取token
export function getInfo(token) {
  return request({
    url: '/admin/admin-info',
    method: 'get',
  })
}
//推出登录
export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
// 权限列表
export function permision () {
  return request({
    url: '/admin/admin-permissions',
    method:'get'
  })
}
