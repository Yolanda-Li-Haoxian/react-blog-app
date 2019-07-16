import actionType from "../actions/actionType";

const isLogin= !!(localStorage.getItem('authToken') || sessionStorage.getItem('authToken'));
const userInfo= JSON.parse(localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo'));
const initState = {
    ...userInfo,
    isLogin,
    isLoading:false
}
export default (state = initState, action) => {
    switch (action.type) {
        case actionType.START_LOGIN: return {
            ...state,
            isLoading:true
        };
        case actionType.SUCCESS_LOGIN: return {
            ...state,
            userName:action.payload.userName,
            isLogin:true,
            isLoading:false
        };
        case actionType.FAILED_LOGIN: return {
            id:'',
            userName:'',
            isLogin:false,
            isLoading:false
        };
        default:
            return state;
    }
}