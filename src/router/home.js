
//登录主页
import Home from '@/pages/home/home';
//登录
import Login from '@/pages/home/login';
//注册
import Register from '@/pages/home/register';
//修改密码
import Change from '@/pages/home/change';

export default [
    {
        path:'/home',
        name:'home',
        component:Home,
        children:[
            {
                path:'login',
                name:'login',
                component:Login,
            },
            {
                path:'register',
                name:'register',
                component:Register,
            },
            {
                path:'change',
                name:'change',
                component:Change,
            }
        ]
    },
]