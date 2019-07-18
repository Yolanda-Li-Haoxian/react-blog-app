import actionType from './actionType';

const loadingArticle = () => {
    return {
        type: actionType.START_LOAD_ARTICLE,
    }
}
const loadedArticle = (article) => {
    return {
        type: actionType.SUCCESS_LOAD_ARTICLE,
        payload: article
    }
}
const failedLoadArticle = () => {
    return {
        type: actionType.FAILED_LOAD_ARTICLE,
    }
}

export const updateArticle = (article) => {
    return dispatch => {
        dispatch(loadingArticle());
        if (article.id) {
            dispatch(loadedArticle(article));
        } else {
            dispatch(failedLoadArticle());
        }
    }
}
export const initArticle = (article) => {
    return {
        type: actionType.INIT_ARTICLE,
        payload: article
    }
}

export const saveArticle = (article)=>{
    return dispatch=>{
        dispatch(loadedArticle(article));
    }
}

