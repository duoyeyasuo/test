import request from '@/utils/request'

// 权限新增
export function AddPermission(params) {
    return request({
        url: '/admin/permissions',
        method: 'post',
        params
    })
}
// 权限编辑
export function editPermission(params) {
    return request({
        url: '/admin/permissions/'+localStorage.getItem('parent_Id'),
        method: 'get',
        params
    })
}
// 权限列表
export function PermissionList(params) {
    return request({
        url: '/admin/permissions',
        method: 'get',
        params
    })
}
// 权限删除
export function delPermissionList(params) {
    return request({
        url: '/admin/permissions/'+localStorage.getItem('deleteId'),
        method: 'delete',
        params
    })
}
// 权限更新
export function upDatePermission(params) {
    return request({
        url: '/admin/permissions/'+localStorage.getItem('parent_Id'),
        method: 'put',
        params
    })
}