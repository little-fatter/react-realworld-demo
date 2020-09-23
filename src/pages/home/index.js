import React from "react"
import {HashRouter as Router,Route,Link,Redirect,Switch, NavLink,withRouter} from 'react-router-dom'
import {getTags,listArticles,feedArticles,favoriteArticle,unfavoriteArticle} from "../../request/api"

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize:10,
            currentPage:1,
            tags:[],
            articles:{},
            pannelType:'global',
            isTags: false,
            tagName:'',
        };
        this.getTags = this.getTags.bind(this);
        this.getArticles = this.getArticles.bind(this);
        this.feedArticles = this.feedArticles.bind(this);
        this.chooseTag = this.chooseTag.bind(this);
        this.choosePannel = this.choosePannel.bind(this);
        this.changePage = this.changePage.bind(this);
    }
    componentWillMount() {
        this.getTags()
        let params = `?limit=${this.state.pageSize}&offset=${this.state.currentPage-1}`;
        if(this.state.tagName) {
            params += `&tag=${this.state.tagName}`
        }
        this.getArticles (params)
    }
    componentWillUnmount() {
        this.setState = () => {
            return
          }
    }
    render() {
        var articlePreview = (articles) => {
            if(!articles || articles.length < 1 ) {
                return <div className="article-preview" >
                            No articles are here... yet.
                        </div> }
            let previews = [];
            previews = articles.map((item,index) => {
                return  <React.Fragment key={'article'+index}>
                            <div className="article-preview">
                                <div className="article-meta">
                                    <Link to={"/profile/"+item.author.username}><img src={item.author.image} /></Link>
                                    <div className="info">
                                    <Link to={"/profile/"+item.author.username} className="author">{item.author.username}</Link>
                                    <span className="date">{item.createdAt}</span>
                                    </div>
                                    <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                    <i className="ion-heart"></i> { item.favoritesCount }
                                    </button>
                                </div>
                                <Link to="/articles" className="preview-link">
                                    <h1>{ item.title }</h1>
                                    <p>{ item.description }</p>
                                    <span>Read more...</span>
                                </Link>
                            </div>
                        </React.Fragment>
            })
            return previews;
        };
        var tagList = (tags) => {
            if(!tags || tags.length < 1 ) return
            return tags.map((item,index) => {
                return <a key={'tag'+index} href="#" onClick={(e)=>this.chooseTag(item,e)} className="tag-pill tag-default">{item}</a>
            })
        }
        var paginations = (accounts)=>{
            if(!accounts) return;
            let pages = Math.ceil(accounts/this.state.pageSize)
            let pgs= [];
            for(let i=1;i<=pages;i++) {
                let pg = <li 
                            key = {'pageNum'+i}
                            className={i==this.state.currentPage ? ' page-item ng-scope active' : 'page-item ng-scope'} 
                            onClick={()=>this.changePage(i)}
                        >
                            <span className="page-link ng-binding" >
                                { i }
                            </span>
                        </li>
                pgs.push(pg)
            }
            return pgs;
        }
		return(
			<div className="home-page">

                <div className="banner">
                    <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                    </div>
                </div>

                <div className="container page">
                    <div className="row">

                    <div className="col-md-9">
                        <div className="feed-toggle">
                        <ul className="nav nav-pills outline-active">
                            <li className="nav-item">
                            <a className={!this.state.isTags && this.state.pannelType == 'feed' ? 'nav-link active' : 'nav-link'} onClick={(e)=>this.choosePannel('feed',e)} to="#">Your Feed</a>
                            </li>
                            <li className="nav-item">
                            <a className={!this.state.isTags && this.state.pannelType == 'global' ? 'nav-link active' : 'nav-link'} onClick={(e)=>this.choosePannel('global',e)}  href="#">Global Feed</a>
                            </li>
                            {this.state.isTags ? <li className="nav-item">
                                <a className={this.state.isTags ? 'nav-link active' : 'nav-link'}  href="#" >{this.state.tagName }</a>
                                </li> : ''}
                        </ul>
                        </div>

                        {articlePreview(this.state.articles.articles)}

                        <nav>
                            <ul className="pagination">
                                {paginations(this.state.articles.articlesCount)}
                            </ul>
                        </nav>

                    </div>

                    <div className="col-md-3">
                        <div className="sidebar">
                        <p>Popular Tags</p>

                        <div className="tag-list">
                            {tagList(this.state.tags)}
                        </div>
                        </div>
                    </div>

                    </div>
                </div>

                </div>
            )
    }
    
    async getTags() {
        const tags = await getTags()
        this.setState(state=> {
            return  {
                tags:tags.data.tags
            }
        }) 
      }
    async getArticles (params) {
        let articles = await listArticles(params)
        this.setState((state)=>{
            return {articles:articles.data}
        })
      }
    async feedArticles (params) {
          let articles = await feedArticles(params)
          this.setState((state)=>{
            return {articles:articles.data}
        })
      }
      
      chooseTag(tagName,e){
        e.preventDefault();
        if(this.state.isTags && this.state.tagName == '# '+tagName) return ;
            this.setState(state => {return {currentPage:1}});
            this.setState(state => {return {isTags:true}});
            this.setState(state => {return {pannelType:'tag'}});
            this.setState(state => {return {tagName:'# '+tagName}});
            let params = `?limit=${this.state.pageSize}&offset=${0}&tag=${tagName}`;
            this.getArticles(params)
    }
      choosePannel(pannelType,e){
        e.preventDefault();
          console.log(123)
          if(pannelType == this.state.pannelType) return ;
          this.setState(state => {return {pannelType:pannelType}});
          this.setState(state => {return {currentPage:1}});
          this.setState(state => {return {isTags:false}});
          if(pannelType == 'feed') {
             this.feedArticles(`?limit=${this.state.pageSize}&offset=${0}`)
          }
          else if (pannelType == 'global') {
              this.getArticles (`?limit=${this.state.pageSize}&offset=${0}`)
          }
      }
      changePage(index){
          if(index== this.state.currentPage) return ;
          this.setState(state => {return {currentPage:index}});
          this.getArticles (`?limit=${this.state.pageSize}&offset=${index-1}`)
      }
}


export default Home;