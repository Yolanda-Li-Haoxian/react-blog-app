import actionType from '../actions/actionType';

const initState = {id: '', author: '', date: '', title: '', value: ''};
export default (state = initState, action) => {
    switch (action.type) {
        case actionType.START_LOAD_ARTICLE:
            return state;
        case actionType.SUCCESS_LOAD_ARTICLE:
            return action.payload;
        case actionType.FAILED_LOAD_ARTICLE:
            return state;
        default:
            return state;
    }
}