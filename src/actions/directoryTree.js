import actionType from './actionType';
import {getTreeDataSrv} from "../services/httpRequest";
const updateNode = (node, tree) => {
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].id === node.id) {
                tree[i].title = node.title;
                tree[i].value = node.value;
                return true;
            }
            if (tree[i].children && updateNode(node, tree[i].children)) {
                return true;
            }
        }
        return false;
    };
const deleteNode = (type, id, tree) => {
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].id === id) {
            tree.splice(i, 1);
            return true;
        }
        if (tree[i].children && deleteNode(type, id, tree[i].children)) {
            return true;
        }
    }
    return false;
}
const loadingTree = () => {
    return {
        type: actionType.START_LOAD_TREE,
    }
}
const loadedTree = (treeData) => {
    return {
        type: actionType.SUCCESS_LOAD_TREE,
        payload: {treeData}
    }
}
const failedLoadTree = () => {
    return {
        type: actionType.FAILED_LOAD_TREE,
    }
}


export const loadTreeData=(userId)=>{
    return dispatch=>{
        dispatch(loadingTree());
        getTreeDataSrv(userId).then(response => {
            dispatch(loadedTree(response.treeData))
        },function (err) {
            dispatch(failedLoadTree());
        });

    }
}

export const updateArticleNode = (article,treeData)=>{
    return dispatch=>{
        dispatch(loadingTree());
        if(updateNode(article,treeData)){
            dispatch(loadedTree(treeData));
        }else {
            dispatch(failedLoadTree());
        }
    }
}

export const deleteTreeNode=(type, id, tree)=>{
    return dispatch=>{
        dispatch(loadingTree());
        if(deleteNode(type, id, tree)){
            dispatch(loadedTree(tree));
        }else {
            dispatch(failedLoadTree());
        }
    }
}

