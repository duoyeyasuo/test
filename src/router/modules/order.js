import Layout from '@/layout'/** 当路由表太长时，可以将其分割为小模块 **/

const orderRouter = {
    path: '/order',
    component: Layout,
    redirect: 'order/index',
    alwaysShow: true,
    meta: {
        title: '订单',
        icon: 'component',
        roles: ['admin']
    },
    children: [
        {
            path: 'index',
            component: () => import('@/views/order/index'),
            name: 'orderIndex',
            meta: {
                title: '订单首页',
                roles: ['admin'] // 你只能在 sub nav中设置角色
            }
        },
    ]
}

export default orderRouter
