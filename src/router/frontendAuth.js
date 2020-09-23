import * as React from 'react';
import { Route,Redirect } from 'react-router-dom';

export class FrontendAuth extends React.Component {
    
    getCookie(name){
        //可以搜索RegExp和match进行学习
        var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    }

    render(){
        const { location,config } = this.props;
        const { pathname } = location;
        const user = this.getCookie('user');
        
        const targetRouterConfig = config.find(v => { 
            var regex=/\/(\S*)\//;
            var rgx=/\/(\S*)\/\:/;
            return v.path === pathname || (v.path.indexOf('/:') > -1 && pathname.match(regex) && pathname.match(regex)[1] === v.path.match(rgx)[1])
        })
        
        if(pathname === '/') {
            return <Redirect to='/home' />
        }   
        if(targetRouterConfig && !targetRouterConfig.auth && !user){
            const { component } = targetRouterConfig;
            return <Route path={pathname} component={component} />
        }
        if(user){
            // 如果是登陆状态，想要跳转到登陆，重定向到主页
            if(pathname === '/login' || pathname === '/register'){
                return <Redirect to='/home' />
            }else{
                // 如果路由合法，就跳转到相应的路由
                if(targetRouterConfig){
                    return <Route path={pathname} component={targetRouterConfig.component} />
                }else{
                    // 如果路由不合法，重定向到 404 页面
                    return <Redirect to='/404' />
                }
            }
        }else{
            // 非登陆状态下，当路由合法时且需要权限校验时，跳转到登陆页面，要求登陆
            if(targetRouterConfig && targetRouterConfig.auth){
                return <Redirect to='/login' />
            }else{
                // 非登陆状态下，路由不合法时，重定向至 404
                return <Redirect to='/404' />
            }
        }
    }
        
}