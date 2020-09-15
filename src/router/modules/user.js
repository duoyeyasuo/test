import Layout from '@/layout'/** When your routing table is too long, you can split it into small modules **/

const userRouter = {
    path: 'user',
    component: Layout,
    redirect: '/user/list',
    alwaysShow: true,
    name: 'user',
    meta: {
        title: '用户',
        icon: 'component',
        roles: ['yh']
    },
    children:   [

    ]
}

export default userRouter
