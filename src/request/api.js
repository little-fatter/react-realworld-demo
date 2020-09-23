import request from './index.js';

export const login = data => {
    return request({
        method:'POST',
        url:'/api/users/login',
        data
    })
}

export const register = data => {
    return request({
        method:'POST',
        url:'/api/users',
        data
    })
}

export const getUser = () => {
    return request({
        method:'GET',
        url:'/api/user'
    })
}

export const updateUser = data => {
    return request({
        method:'PUT',
        url:'/api/user',
        data
    })
}

export const getProfile = username => {
    return request({
        method:'GET',
        url:'/api/profiles/'+username
    })
}

export const followUser = username => {
    return request({
        method:'POST',
        url:'/api/profiles/'+username+'/follow'
    })
}

export const unfollowUser = username => {
    return request({
        method:'DELETE',
        url:'/api/profiles/'+username+'/follow'
    })
}

export const listArticles = params => {
    return request({
        method:'GET',
        url:'/api/articles'+params
    })
}

export const feedArticles = params => {
    return request({
        method:'GET',
        url:'/api/articles/feed'+params,
    })
}

export const getArticle = slug => {
    return request({
        method:'GET',
        url:'/api/articles/'+slug
    })
}

export const createArticle = data => {
    return request({
        method:'POST',
        url:'/api/articles',
        data
    })
}

export const updateArticle = (slug,data) => {
    return request({
        method:'PUT',
        url:'/api/articles/'+slug,
        data
    })
}

export const deleteArticle = (slug) => {
    return request({
        method:'DELETE',
        url:'/api/articles/'+slug
    })
}

export const addComments = (slug,data) => {
    return request({
        method:'POST',
        url:'/api/articles/'+slug+'/comments',
        data
    })
}

export const getComments = (slug) => {
    return request({
        method:'GET',
        url:'/api/articles/'+slug+'/comments'
    })
}

export const deleteComments = (slug,id) => {
    return request({
        method:'DELETE',
        url:'/api/articles/'+slug+'/comments/'+id
    })
}

export const favoriteArticle = (slug) => {
    return request({
        method:'POST',
        url:'/api/articles/'+slug+'/favorite'
    })
}

export const unfavoriteArticle = (slug) => {
    return request({
        method:'DELETE',
        url:'/api/articles/'+slug+'/favorite'
    })
}

export const getTags = () => {
    return request({
        method:'GET',
        url:'/api/tags'
    })
}