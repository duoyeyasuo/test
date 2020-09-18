import Layout from '@/layout'/** 当路由表太长时，可以将其分割为小模块 **/

const goodsRouter = {
    path: '/goods',
    component: Layout,
    redirect: 'goods/index',
    alwaysShow: true,
    meta: {
        title: '商品',
        icon: 'component',
        roles: ['admin']
    },
    children: [
        {
            path: 'index',
            component: () => import('@/views/goods/index'),
            name: 'goodsIndex',
            meta: {
                title: '商品分类',
                roles: ['admin'] // 你只能在 sub nav中设置角色
            }
        },
        {
            path: 'goodsAdmin',
            component: () => import('@/views/goods/goodsAdmin'),
            name: 'ogoodsAdmin',
            meta: {
                title: '商品管理',
                roles: ['admin'] // 你只能在 sub nav中设置角色
            }
        },
    ]
}

export default goodsRouter