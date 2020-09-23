import React from "react"
import {HashRouter as Router,Route,Link,Redirect,Switch, NavLink,withRouter} from 'react-router-dom'
import {login,register} from "../../request/api"

class Login extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            date : new Date(),
            isLogin : props.location.pathname == '/login' ,
            email:'',
            username:'',
            password: '',
            count:0,
            errors:{}
        };
        this.usernameChange = this.usernameChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }
    componentDidMount() {
    }
    componentDidUpdate (preProps) {
        if(this.props.location.pathname!==preProps.location.pathname)
        {
            this.setState(state=> {
                return {isLogin : this.props.location.pathname == '/login'} 
            })
        }
    }
    usernameChange (e) {
        let val = e.target.value;
        this.setState((state) => {
            return {username: val}
          });
    }
    emailChange (e) {
        let val = e.target.value;
        this.setState((state) => {
            return {email: val}
          });
    }
    passwordChange (e) {
        let val = e.target.value;
        this.setState((state) => {
            return {password: val}
          });
    }
    async submitUser (e) {
        try { 
            e.preventDefault();
        const {data} = this.state.isLogin ?
                    await login({
                            user:{
                                email:this.state.email,
                            password: this.state.password}
                        })
                    : await register({
                            user:{
                            username:this.state.username,
                            email:this.state.email,
                            password: this.state.password}
                        })
                        let user = JSON.stringify(data.user);
                        // 设置cookie 为一天
                        let time = new Date(); 
                        time.setTime(time.getTime() + 24*60*60*1000);
                        document.cookie=`user=${user}; expires=${time.toGMTString()}`;
                        this.props.history.push('/')
                    }
                    catch (err) {
                        this.setState (state => {
                            return {errors:err.response.data.errors}
                        })
                    }

    }
	render() {
        var list = (errors) => {
            var res = [];
            for(let key in errors) {
                for(let i=0;i<errors[key].length;i++) {
                res.push(<li key={key+errors[key][i]+i}>{key} : {errors[key][i]}</li>)
                }
            }
            return res
        }
		return(
			<div className="auth-page">
                <div className="container page">
                    <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">{this.state.isLogin ? 'sign in' : 'Sign up'}</h1>
                        <p className="text-xs-center">
                        {this.state.isLogin ? <Link to="/register">create an account?</Link> :
                        <Link to="/login">Have an account?</Link> }
                        </p>

                        
                        <ul className="error-messages">
                         {Object.keys(this.state.errors).length > 0  ? list(this.state.errors) : ''}
                        </ul>

                        <form onSubmit={this.submitUser}>
                            {!this.state.isLogin ? 
                        <fieldset className="form-group">
                            <input defaultValue={this.state.username} onChange={this.usernameChange} className="form-control form-control-lg" type="text" placeholder="Your Name"></input>
                        </fieldset> : '' }
                        <fieldset className="form-group">
                            <input defaultValue={this.state.email}  onChange={this.emailChange} className="form-control form-control-lg" type="email" placeholder="Email"></input>
                        </fieldset>
                        <fieldset className="form-group">
                            <input defaultValue={this.state.password} onChange={this.passwordChange} className="form-control form-control-lg" type="password" placeholder="Password"></input>
                        </fieldset>
                        <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                            {this.state.isLogin ? 'Signs in' : 'Sign up'}
                        </button>
                        </form>
                    </div>

                    </div>
                </div>
                </div>
			)
	}
}


export default Login;