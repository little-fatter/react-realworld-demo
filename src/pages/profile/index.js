import React from "react"
import {HashRouter as Router,Route,Link,Redirect,Switch, NavLink,withRouter} from 'react-router-dom'
import {getProfile,listArticles,getUser} from "../../request/api"

class Profile extends React.Component {
	constructor(props) {
		console.log(props)
		super(props);
		this.state = {
			favoriteArticles : {},
            myArticles : {},
            currentUser : props.location.pathname.split('/')[2] || '',
            pageSize: 10,
            currentPage:1,
            profile: {},
            user:'',
            flag: 'myArticles',
            userRequestCount:0
		};
		this.changePannel = this.changePannel.bind(this);
		this.getFavoriteArticles = this.getFavoriteArticles.bind(this);
		this.getMyArticles = this.getMyArticles.bind(this);
		this.getProfile = this.getProfile.bind(this);
		this.getUser = this.getUser.bind(this);
	}
	componentDidMount() {
		this.getFavoriteArticles( `?limit=${this.state.pageSize}&offset=${this.state.currentPage-1}&favorited=${this.state.currentUser}`)
		this.getMyArticles( `?limit=${this.state.pageSize}&offset=${this.state.currentPage-1}&author=${this.state.currentUser}`)
		this.getProfile()
        this.getUser()
	}
	componentDidUpdate(preProps) {
		if(this.props.location.pathname!==preProps.location.pathname) {
			this.setState(() => {
				return {currentUser : this.props.location.pathname.split('/')[2] || '',}
			})
			// 初始化
			location.reload()
		}
	}
	render() {
		var previews = (list) => {
			if(!list || list.length < 1) {
				return <div className="article-preview" >
				No articles are here... yet.
			</div>
			}
		 let previews =	list.map((item,index) => {
				return <div key={'my-article'+index} className="article-preview">
						<div className="article-meta">
							<Link to={"/profile/"+item.author.username}><img src={item.author.image} /></Link>
							<div className="info">
							<Link to={"/profile/"+item.author.username} className="author">{item.author.username}</Link>
							<span className="date">{item.createdAt}</span>
							</div>
							<button className="btn btn-outline-primary btn-sm pull-xs-right">
							<i className="ion-heart"></i> {item.favoritesCount}
							</button>
						</div>
						<Link to="/articles" className="preview-link">
							<h1>{item.title}</h1>
							<p>{item.description}</p>
							<span>Read more...</span>
						</Link>
				</div>

			})
			return previews;
		}
		return(
			<div className="profile-page">

				<div className="user-info">
					<div className="container">
					<div className="row">

						<div className="col-xs-12 col-md-10 offset-md-1">
						<img src={this.state.profile.image} className="user-img" />
						<h4>{this.state.profile.username}</h4>
						<p>
							{this.state.profile.bio}
						</p>
						{this.state.profile.username !== this.state.user.username ?
						<button className="btn btn-sm btn-outline-secondary action-btn">
							<i className="ion-plus-round"></i>
							&nbsp;
							Follow { this.state.profile.username } 
						</button> : '' }
						</div>

					</div>
					</div>
				</div>

				<div className="container">
					<div className="row">

					<div className="col-xs-12 col-md-10 offset-md-1">
						<div className="articles-toggle">
						<ul className="nav nav-pills outline-active">
							<li className="nav-item">
							<span className={this.state.flag == 'myArticles' ? "nav-link active" : 'nav-link' } onClick={()=>this.changePannel('myArticles')}>My Articles</span>
							</li>
							<li className="nav-item">
							<span className={this.state.flag == 'favoriteArticles' ? "nav-link active" : 'nav-link' } onClick={()=>this.changePannel('favoriteArticles')}>Favorited Articles</span>
							</li>
						</ul>
						</div>
						{ this.state.flag == 'myArticles'  ?
							<React.Fragment>
								{previews(this.state.myArticles.articles)}
							</React.Fragment> 
							: 
							<React.Fragment>
								{previews(this.state.favoriteArticles.articles)}
							</React.Fragment>
						}
						

						

					</div>

					</div>
				</div>

				</div>
			)
	}

	async getFavoriteArticles (params) {
		let { data } = await listArticles(params)
		this.setState(() => {
			return {favoriteArticles:data}
		})
	}
	async getMyArticles (params) {
		let { data } = await listArticles(params)
		this.setState(() => {
			return {myArticles:data}
		})
	}
	async getProfile () {
		let { data } = await getProfile(this.state.currentUser)
		this.setState(() => {
			return {profile:data.profile}
		})
	}
	async getUser() {
		this.setState((state) => {
			return {userRequestCount:state.userRequestCount + 1}
		})
	   try {
		   let { data } = await getUser();
		   this.setState(() => {
			return {user:data.user}
			})
		} catch (err) {
		   if(this.state.userRequestCount >50) {
				console.log(err)
				return
		   }
		   this.getUser()
	   }
	}
	changePannel(flag) {
		 if(flag === this.state.flag) return ;
		 this.setState(()=> {return {flag:flag}} );
	 }
}


export default Profile;