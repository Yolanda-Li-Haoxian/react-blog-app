import axios from 'axios';

const service = axios.create({
    baseURL:'http://rap2api.taobao.org/app/mock/224135'
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
    if(response.data.status===200){
        return response.data.data;
    }else {
        alert(response.data.errMsg);
    }
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
export const getTreeData=()=>{
    return service.post('/api/blog/getTree')
}

export const insertTreeNode=(node)=>{
    return service.post('/api/blog/insertTreeNode',node);
}
export const deleteTreeNodeById = (id)=>{
    return service.delete('/api/blog/deleteTreeNode',{id});
}
export const updateArticle=(node)=>{
    return service.post('/api/blog/updateArticle',node);
}
export const updateFolder=(node)=>{
    return service.post('/api/blog/updateFolder',node);
}