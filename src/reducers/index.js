import {combineReducers} from 'redux';
import blogs from './blogs';
import user from './user';
export default combineReducers({
    blogs,
    user
})