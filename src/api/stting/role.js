import request from '@/utils/request'

// 角色列表
export function roleList(params) {
    return request({
        url: '/admin/roles',
        method: 'get',
        params
    })
}
// 角色新增
export function roleAdd(params) {
    return request({
        url: '/admin/roles',
        method: 'post',
        params
    })
}