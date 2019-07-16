import actionType from './actionType'
export const add = (id)=>{
    return {
        type:actionType.BLOG_ADD,
        payload:{
            id
        }
    }
}