import actionType from './actionType';
import {loginSrv} from '../services/httpRequest'

const startLogin = (userInfo) => {
    return {
        type: actionType.START_LOGIN,
    }
}
const successLogin = (userInfo) => {
    return {
        type: actionType.SUCCESS_LOGIN,
        payload: userInfo
    }
}
const failedLogin = (id) => {
    window.localStorage.removeItem('authToken');
    window.sessionStorage.removeItem('authToken');
    window.sessionStorage.removeItem('userInfo');
    window.sessionStorage.removeItem('userInfo');
    return {
        type: actionType.FAILED_LOGIN,
    }
}

export const login = (user) => {
    return dispatch => {
        dispatch(startLogin());
        loginSrv(user).then(
            resp => {
                if (resp.data.status === 200) {
                    // resp.data.data.userName = user.username;
                    const {authToken, ...userInfo} = resp.data.data;
                    if (user.remember) {
                        window.localStorage.setItem('authToken', authToken);
                        window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    } else {
                        window.sessionStorage.setItem('authToken', authToken);
                        window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                    }
                    dispatch(successLogin(resp.data.data));
                } else {
                    dispatch(failedLogin())
                }
            }
        );
    }
}
export const logout = ()=>{
    return dispatch=>{
        dispatch(failedLogin())
    }
}

