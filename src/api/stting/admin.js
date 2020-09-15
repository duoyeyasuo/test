import request from '@/utils/request'

// 权限新增
export function adminList(params) {
    return request({
        url: '/admin/admin',
        method: 'get',
        params
    })
}

export function adminAdd(params) {
    return request({
        url: '/admin/admin',
        method: 'post',
        params
    })
}