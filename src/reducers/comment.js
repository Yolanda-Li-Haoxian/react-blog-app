import actionType from '../actions/actionType';

const initState = {
    isLoaded: false,
    submitting:false,
    commentList: []
};
export default (state = initState, action) => {
    switch (action.type) {
        case actionType.START_LOAD_COMMENTS:
            return {...state, isLoaded: false};
        case actionType.SUCCESS_LOAD_COMMENTS:
            return {...state, isLoaded: true, commentList: action.payload.list};
        case actionType.FAILED_LOAD_COMMENTS:
            return {...state, isLoaded: false};

        case actionType.START_ADD_COMMENT:
            return {...state, submitting: true,isLoaded: false};
        case actionType.SUCCESS_ADD_COMMENT:
            state.commentList.unshift(action.payload.comment);
            return {...state, isLoaded: true,submitting: false};

        case actionType.DELETE_COMMENT:
            const index = state.commentList.findIndex(function (item) {
                return item.id === action.payload.id;
            });
            index >= 0 && state.commentList.splice(index, 1);
            return {...state, isLoaded: true};

        default:
            return state;
    }
}