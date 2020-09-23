import Layout from '../pages/layout';
import Home from '../pages/home';
import Settings from '../pages/settings';
import Profile from '../pages/profile';
import Editors from '../pages/editors';
import Articles from '../pages/articles';
import Login from '../pages/login';

export const routerConfig = [
    {
        path:'/',
        component:Layout,
        auth:false
    },
    {
        path:'/home',
        component:Home,
        auth:false
    },
    {
        path:'/settings',
        component:Settings,
        auth:true
    },
    {
        path:'/profile/:username',
        component:Profile,
        auth:true
    },
    {
        path:'/editors',
        component:Editors,
        auth:true
    },
    {
        path:'/articles',
        component:Articles,
        auth:true
    },
    {
        path:'/login',
        component:Login,
        auth:false
    },
    {
        path:'/register',
        component:Login,
        auth:false
    }
]