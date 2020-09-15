import Layout from '@/layout'/** When your routing table is too long, you can split it into small modules **/

const settingRouter = {
    path: '/setting',
    component: Layout,
    redirect: '/setting/permission',
    alwaysShow: true,
    name: 'setting',
    meta: {
        title: '设置',
        icon: 'component',
        roles: ['sz']
    },
    children:   [
        {
            path: 'permission',
            component: () => import('@/views/setting/permission/permissionList'),
            name: 'permission',
            meta: {
                title: '权限设置',
                roles: ['sz'] // or you can only set role in sub nav
            }
        },
        {
            path: 'role',
            component: () => import('@/views/setting/permission/roleList'),
            name: 'role',
            meta: {
                title: '角色设置',
                roles: ['sz'] // or you can only set role in sub nav
            }
        },
        {
            path: 'admin',
            component: () => import('@/views/setting/permission/adminList'),
            name: 'admin',
            meta: {
                title: '管理员设置',
                roles: ['sz'] // or you can only set role in sub nav
            }
        },
    ]
}

export default settingRouter
