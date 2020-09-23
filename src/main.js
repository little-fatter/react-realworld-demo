import React,{Component} from 'react'
import ReactDOM from 'react-dom'

import {HashRouter as Router,Route,Link,Redirect,Switch, NavLink,withRouter} from 'react-router-dom'
import ErrorPage from './pages/errorPage';

import './index.css';
import '../public/productionready.css';

import Routers from './router/router'

import Layout from './pages/layout/';


// 使用 withRouter 
let WithRouterAPP = withRouter(Layout)

ReactDOM.render(<Router>
    <WithRouterAPP/>
    
    <Route path='/404' component={ErrorPage}></Route>        
</Router>,document.getElementById('app')
)

