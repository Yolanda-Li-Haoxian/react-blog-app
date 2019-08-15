import actionType from './actionType';
import {getCommentsByArticleId,insertComment,removeComment} from '../services/httpRequest';

const startLodeComments = () => {
    return {
        type: actionType.START_LOAD_COMMENTS
    }
}
const successLoadComments = (list) => {
    return {
        type: actionType.SUCCESS_LOAD_COMMENTS,
        payload: {list}
    }
}
const failLoadComments = () => {
    return {
        type: actionType.FAILED_LOAD_COMMENTS,
    }
}

const startAddComment = () => {
    return {
        type: actionType.START_ADD_COMMENT
    }
}
const addComment = (item) => {
    return {
        type: actionType.SUCCESS_ADD_COMMENT,
        payload: {comment:item}
    }
}
const deleteComment = (id) => {
    return {
        type: actionType.DELETE_COMMENT,
        payload: {id}
    }
}

export const getCommentsList = (articleId) => {
    return dispatch => {
        dispatch(startLodeComments());
        getCommentsByArticleId(articleId).then((data) => {
            dispatch(successLoadComments(data));
        }, () => {
            dispatch(failLoadComments());
        });
    }
}
export const addCommentToList = (comment) => {
    return dispatch => {
        dispatch(startAddComment());
        insertComment(comment).then(() => {
            dispatch(addComment(comment));
        }, () => {
            dispatch(failLoadComments());
        });
    }
}
export const deleteCommentFromList = (id) => {
    return dispatch => {
        dispatch(startLodeComments());
        removeComment(id).then(() => {
            dispatch(deleteComment(id));
        }, () => {
            dispatch(failLoadComments());
        });
    }
}

