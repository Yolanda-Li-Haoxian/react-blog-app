import {combineReducers} from 'redux';
import directoryTree from './directoryTree';
import user from './user';
import comment from './comment';
import article from './article';
export default combineReducers({
    directoryTree,
    user,
    article,
    comment
})