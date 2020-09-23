import React from "react"
import {HashRouter as Router,Route,Link,Redirect,Switch, NavLink,withRouter} from 'react-router-dom'

import Routers from '../../router/router'
class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pathname : props.location.pathname,
            user : JSON.parse(this.getCookie('user'))
        }
    }
    componentDidUpdate(preProps) {
        if(this.props.location.pathname!==preProps.location.pathname)
        {
            this.setState(state=> {
                return { pathname : this.props.location.pathname }
            })
        }
    }
    componentDidMount() {
        
    }
    getCookie(name){
        //可以搜索RegExp和match进行学习
        var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        } else {
            return null;
        }
      }
	render() {
        var user = JSON.parse(this.getCookie('user'));
		return(
			<div>
                <nav className="navbar navbar-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">conduit</Link>
                        <ul className="nav navbar-nav pull-xs-right">
                        <li className="nav-item">
                            <Link className={this.state.pathname == '/home' ? "nav-link active" : "nav-link"} to="/home">Home</Link>
                        </li>
                            { user ?
                            <React.Fragment>
                                <li className="nav-item">
                                    <Link className={this.state.pathname == '/editors' ? "nav-link active" : "nav-link"} to="/editors">
                                    <i className="ion-compose"></i>&nbsp;New Post
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={this.state.pathname == '/settings' ? "nav-link active" : "nav-link"} to="/settings">
                                    <i className="ion-gear-a"></i>&nbsp;Settings
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={this.state.pathname.indexOf('profile') > -1  ? "nav-link active" : "nav-link"} to={"/profile/"+user.username}>
                                    <i className="ion-compose"></i>&nbsp;{user.username}
                                    </Link>
                                </li>
                            </React.Fragment>
                            : 
                            <React.Fragment>
                                <li className="nav-item">
                                    <Link className={this.state.pathname == '/login' ? "nav-link active" : "nav-link"} to="/login">Sign in</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={this.state.pathname == '/register' ? "nav-link active" : "nav-link"} to="/register">Sign up</Link>
                                </li> 
                            </React.Fragment>
                            }
                        
                        </ul>
                    </div>
                </nav>
                <Routers ></Routers>
                <footer>
                    <div className="container">
                        <Link to="/" className="logo-font">conduit</Link>
                        <span className="attribution">
                            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
                        </span>
                    </div>
                </footer>
            </div>
			)
	}
}


export default Layout;