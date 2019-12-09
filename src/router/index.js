import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/taskCenter'
        },
        {
            path: '/',
            component: () => import('../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/taskCenter',
                    component: () => import('../components/page/TaskCenter.vue'),
                    meta: { title: '任务大厅' }
                },
                {
                    path: '/winnerList',
                    component: () => import('../components/page/WinnerList.vue'),
                    meta: { title: '投标信息' }
                },
                {
                    path: '/taskEdit',
                    component: () => import('../components/page/TaskEdit.vue'),
                    meta: { title: '编辑' }
                },
                {
                    path: '/taskDetail',
                    component: () => import('../components/page/TaskDetail.vue'),
                    meta: { title: '任务详情' }
                },
                {
                    path: '/taskList',
                    component: () => import('../components/page/TaskList.vue'),
                    meta: { title: '任务记录' }
                },
                {
                    path: '/account',
                    component: () => import('../components/page/Account.vue'),
                    meta: { title: '账户余额' }
                },
                {
                    path: '/userinfo',
                    component: () => import('../components/page/Userinfo1.vue'),
                    meta: { title: '个人信息' }
                },
                {
                    path: '/userinfopre',
                    component: () => import('../components/page/UserInfoPre.vue'),
                    meta: { title: '个人信息预览' }
                },
                {
                    path: '/certification',
                    component: () => import('../components/page/Certification.vue'),
                    meta: { title: '实名认证' }
                },
                {
                    path: '/404',
                    component: () => import('../components/page/404.vue'),
                    meta: { title: '404' }
                }

            ]
        },
        {
            path: '/login',
            component: () => import('../components/page/Login.vue')
        },
        {
            path: '/userregister',
            component: () => import('../components/page/Userregister.vue')
        },
        {
            path: '/forgetPassword',
            component: () => import('../components/page/ForgetPassword.vue')
        },
        {
            path: '/check',
            component: () => import('../components/page/Check.vue')
        },
        
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
