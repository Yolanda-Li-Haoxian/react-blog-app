import actionType from '../actions/actionType';

const initState = {
    isLoading: false,
    articleData: {
        id: '', author: '', createAt: '', title: '', value: '',
        lastUpdate: '', likes: 0, favorites: 0, commentsCount: 0
    }
};
export default (state = initState, action) => {
    switch (action.type) {
        case actionType.START_LOAD_ARTICLE:
            return {...state, isLoading: true};
        case actionType.SUCCESS_LOAD_ARTICLE:
            return {...state, isLoading: false, articleData: action.payload};
        case actionType.FAILED_LOAD_ARTICLE:
            return {...state, isLoading: true};
        default:
            return state;
    }
}