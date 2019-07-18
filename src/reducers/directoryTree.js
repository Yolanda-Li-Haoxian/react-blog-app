//要写纯函数
import actionType from '../actions/actionType';

const initState = {
    treeData: [],
    isLoading: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case actionType.START_LOAD_TREE:
            return {
                ...state,
                isLoading: true
            };
        case actionType.SUCCESS_LOAD_TREE:
            return {
                ...state,
                treeData: action.payload.treeData,
                isLoading: false
            };
        case actionType.FAILED_LOAD_TREE:
            return {
                ...initState,
                isLoading: true
            };
        default:
            return state;
    }
}