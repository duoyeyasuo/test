import Layout from '@/layout'/** When your routing table is too long, you can split it into small modules **/

const orderRouter = {
    path: '/order',
    component: Layout,
    redirect: 'order/index',
    alwaysShow: true,
    meta: {
        title: '订单',
        icon: 'component',
        roles: ['dd']
    },
    children: [
        {
            path: 'index',
            component: () => import('@/views/order/index'),
            name: 'orderIndex',
            meta: {
                title: '订单首页',
                roles: ['dd'] // or you can only set role in sub nav
            }
        },
    ]
}

export default orderRouter
