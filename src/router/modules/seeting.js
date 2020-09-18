import Layout from '@/layout'/** When your routing table is too long, you can split it into small modules **/

const settingRouter = {
    path: '/setting',
    component: Layout,
    redirect: '/setting/permission',
    alwaysShow: true,
    name: 'setting',
    meta: {
        title: '设置',
        icon: 'setting',
        roles: ['sz']
    },
    children:   [
        {
            path: 'permission',
            component: () => import('@/views/setting/permission/permissionList'),
            name: 'permission',
            meta: {
                title: '权限管理',
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
        {
            path: 'service',
            component: () => import('@/views/setting/permission/service'),
            name: 'service',
            meta: {
                title: '客服管理',
                roles: ['sz'] // or you can only set role in sub nav
            }
        },
        {
            path: 'pages',
            component: () => import('@/views/setting/permission/pages'),
            name: 'pages',
            meta: {
                title: '页面管理',
                roles: ['sz'] 
            }
        },
        {
            path: 'notes',
            component: () => import('@/views/setting/permission/notes'),
            name: 'note',
            meta: {
                title: '短信设置',
                roles: ['sz'] 
            }
        },
        {
            path: 'datAllocation',
            component: () => import('@/views/setting/permission/datAllocation'),
            name: 'datAllocation',
            meta: {
                title: '数据配置',
                roles: ['sz'] 
            }
        },
        {
            path: 'logistics',
            component: () => import('@/views/setting/permission/logistics'),
            name: 'logistics',
            meta: {
                title: '物流设置',
                roles: ['sz']
            }
        },
        {
            path: 'pickGoods',
            component: () => import('@/views/setting/permission/pickGoods'),
            name: 'pickGoods',
            meta: {
                title: '提货点设置',
                roles: ['sz'] 
            }
        },
    ]
}

export default settingRouter
