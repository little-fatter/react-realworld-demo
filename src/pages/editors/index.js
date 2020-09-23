import React from "react"
import {HashRouter as Router,Route,Link,Redirect,Switch, NavLink,withRouter} from 'react-router-dom'
import {getUser,createArticle} from "../../request/api"

//防抖方法
function debounce(fn, ms = 1000) {
    let timeoutId
    return function () {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        fn.apply(this, arguments)
      }, ms)
    }
  }

class Editors extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			userRequestCount:0,   
            errors: {} ,
			article : {},
			timer : null
		};
		this.submitEdit = this.submitEdit.bind(this);
		this.getUser = this.getUser.bind(this);
		this.createArticle = this.createArticle.bind(this);
		this.iptChange = this.iptChange.bind(this);
		this.setArticle = debounce(this.setArticle,1000)
	}
	render() {
		return(
			<div className="editor-page">
				<div className="container page">
					<div className="row">
					<div className="col-md-10 offset-md-1 col-xs-12">
						<form onSubmit={this.submitEdit}>
							<fieldset>
								<fieldset className="form-group">
									<input type="text" className="form-control form-control-lg" onInput={(e)=>this.iptChange('title',e)} placeholder="Article Title"></input>
								</fieldset>
								<fieldset className="form-group">
									<input type="text" className="form-control" onInput={(e)=>this.iptChange('description',e)} placeholder="What's this article about?"></input>
								</fieldset>
								<fieldset className="form-group">
									<textarea className="form-control" rows="8" onInput={(e)=>this.iptChange('body',e)} placeholder="Write your article (in markdown)"></textarea>
								</fieldset>
								<button className="btn btn-lg pull-xs-right btn-primary" type="submit">
									Publish Article
								</button>
							</fieldset>
						</form>
					</div>

					</div>
				</div>
				</div>
			)
	}
	async getUser() {
		try {
			this.setState((state) => { return { userRequestCount : state.userRequestCount + 1 } });
			let { data } = await getUser();
			this.setState((state) => { return { user : data.user } });
			// this.user = data.user;
		} catch (err) {
			if(this.state.userRequestCount >50) {
				 console.log(err)
				 return
			}
			this.getUser()
		}
	 }
	 async createArticle (data) {
		try {
			 let responseData  = await createArticle(data)
			   responseData.status == 200 ?  this.props.history.push('/home') : ''
		} catch (err) {
			 console.log(err)
		}
	 }
	 submitEdit (e) {
		 e.preventDefault();
		 this.createArticle(this.state.article);
	 }
	 setArticle (data) {
		this.setState(()=>{
			return {article:data}
		})
	 }
	 iptChange(key,e) {
		let obj =  {};
		obj[key] = e.target.value
		let data = Object.assign({},this.state.article,obj)
		this.setArticle(data)
	}
}


export default Editors;