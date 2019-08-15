import axios from 'axios';

const service = axios.create({
    baseURL: 'http://rap2api.taobao.org/app/mock/224135'
});
const service1 = axios.create({
    baseURL: 'http://rap2api.taobao.org/app/mock/224135'
});

// 添加一个请求拦截器
service.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.data = {};
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 添加一个响应拦截器
service.interceptors.response.use(function (response) {
    // Do something with response data
    if (response.data.status === 200) {
        return response.data.data;
    } else {
        alert(response.data.errMsg);
    }
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
//tree
export const getTreeDataSrv = (userId) => {
    return service.post('/api/blog/getTree',userId)
};
export const insertTreeNode = (node) => {
    return service.post('/api/blog/insertTreeNode', node);
};
export const deleteTreeNodeById = (id) => {
    return service.delete('/api/blog/deleteTreeNode',id);
};
export const updateArticleSrv = (node) => {
    return service.post('/api/blog/updateArticle', node);
};
export const updateFolder = (node) => {
    return service.post('/api/blog/updateFolder', node);
};
//user
export const getUserById = (id) => {
    return service.post('/api/user/getUserById', {id});
};
export const updateUser = (user) => {
    return service.post('/api/user/updateUser', user);
};
export const registerUser = (user) => {
    return service.post('/api/user/insertUser', {user});
};
export const deleteUser = (id) => {
    return service.post('/api/user/deleteUser', id);
};
export const loginSrv = (userInfo)=>{
    return service1.post('/api/user/login', userInfo);
}
//blog articles
export const getBlogArticles = ()=>{
    return service.post('/api/blog/getBlogArticles');
}

//comment
export const getCommentsByArticleId = (id)=>{
    return service.post('/api/comment/getCommentsByArticleId',{articleId:id});
}
export const insertComment = (comment)=>{
    return service.post('/api/comment/insertComment',comment);
}
export const updateComment = (para)=>{
    return service.post('/api/comment/updateComment',para);
}
export const removeComment = (id)=>{
    return service.post('/api/comment/removeComment',id);
}
