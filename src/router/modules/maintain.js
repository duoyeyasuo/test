import Layout from '@/layout'/** 当路由表太长时，可以将其分割为小模块 **/

const orderRouter = {
    path: '/maintain',
    component: Layout,
    redirect: 'maintain/index',
    alwaysShow: true,
    meta: {
        title: '维护',
        icon: 'component',
        roles: ['wh']
    },
    children: [
        {
            path: 'development',
            component: () => import('@/views/maintain/developMent'),
            name: 'developMent',
            meta: {
                title: '开发配置',
                roles: ['kfpz'] // 你只能在 sub nav中设置角色
            }
        },
    ]
}

export default orderRouter


