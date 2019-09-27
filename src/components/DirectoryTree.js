import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import {Tree, Icon, Menu, Input, Modal, message, Tooltip, Spin} from 'antd';
import AddFileModal from './modal/AddFileModal';
import {loadTreeData, deleteTreeNode} from '../actions/directoryTree';
import {updateArticle} from '../actions/article';
import {deleteTreeNodeById, insertTreeNode, updateFolder} from '../services/httpRequest';
import {getGUID} from "../services/commenSrv";

const {Search} = Input;
const {TreeNode, DirectoryTree} = Tree;
const dataList = [];
let editNode = {};
const mapStateToProps = (state) => ({
    userId: state.user.id,
    userName: state.user.userName,
    treeData: state.directoryTree.treeData,
    isLoading: state.directoryTree.isLoading
});

const getParentId = (id, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.id === id)) {
                parentKey = node.id;
            } else if (getParentId(id, node.children)) {
                parentKey = getParentId(id, node.children);
            }
        }
    }
    return parentKey;
};
const insertNode = (type, id, tree, node) => {
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].id === id) {
            if (!tree[i].children) {
                tree[i].children = [];
            }
            tree[i].children.push(node);
            dataList.push(node);
            return true;
        }
        if (tree[i].children && insertNode(type, id, tree[i].children, node)) {
            return true;
        }
    }
    return false;
};
const updateNode = (id, node, tree) => {
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].id === id) {
            tree[i].title = node.title;
            tree[i].value = node.value;
            return true;
        }
        if (tree[i].children && updateNode(id, node, tree[i].children)) {
            return true;
        }
    }
    return false;
};

const generateList = data => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const {id, title} = node;
        dataList.push({id, title});
        if (node.children) {
            generateList(node.children);
        }
    }
};

class ArticlesTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: [],
            searchValue: '',
            showEditModal: false,
            expandedKeys: [],
            autoExpandParent: true,
            modalType: 1   //1:new folder,2:new file,3 rename folder
        }
    }

    //Life cycle of component
    componentWillMount() {
        this.props.loadTreeData(this.props.userId);
        generateList(this.props.treeData);
    }

    componentDidMount() {
        document.addEventListener('click', this._handleClickOutside);
        document.addEventListener('scroll', this._handleScroll);
    };

    componentWillUnmount() {
        document.removeEventListener('click', this._handleClickOutside);
        document.removeEventListener('scroll', this._handleScroll);

    }

    //tree event
    onSelect = (selectedKeys, info) => {
        const blog = info.node.props.dataRef;
        blog.type === 2 && this.props.updateArticle(blog);
    };
    onRightClick = ({event, node}) => {
        const {pageX, pageY} = event;
        editNode = node.props.dataRef;
        this.setState({
                selectedKey: node.props.eventKey,
                modalType: node.props.isLeaf ? 2 : 1
            }, () => {
                this.renderMenu({pageX, pageY});
            }
        );
    };
    onRename = () => {
        this.setState({showEditModal: true, modalType: 3});
    }
    onNewFolder = () => {
        this.setState({showEditModal: true, modalType: 1});
    };
    onNewFile = () => {
        this.setState({showEditModal: true, modalType: 2})
    };
    onDelete = () => {
        const {selectedKey} = this.state;
        const {treeData} = this.props;
        const {confirm} = Modal;
        const that = this;
        confirm({
            title: 'Do you Want to delete these items?',
            content: 'When clicked the OK button,将无法恢复',
            confirmLoading: true,
            onOk() {
                deleteTreeNodeById(selectedKey).then(response => {
                    message.success(response.msg);
                    that.props.deleteTreeNode(2, selectedKey, treeData);
                });
            },
            onCancel() {

            },
        });
    };
    onSearch = e => {
        const {value} = e.target;
        const {treeData} = this.props;
        const expandedKeys = dataList.map(item => {
            if (item.title.indexOf(value) > -1) {
                return getParentId(item.id, treeData);
            }
            return null;
        })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        });
    };
    onExpand = expandedKeys => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    //modal event
    handleModalOk = e => {
        const {form} = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            form.resetFields();
            if (this.state.modalType !== 3) {
                this._createTreeNode(values);
            } else {
                this._updateFolderNode(values);
            }

        });
    };

    handleModalCancel = e => {
        this.setState({
            showEditModal: false,
        });
    };

    //static function
    _saveFormRef = formRef => {
        this.formRef = formRef;
    };

    _handleClickOutside = () => {
        if (this.toolTip) {
            ReactDOM.unmountComponentAtNode(this.cmContainer);
            this.toolTip = null;
        }
    };
    _handleScroll = () => {
        if (this.toolTip) {
            ReactDOM.unmountComponentAtNode(this.cmContainer);
            this.toolTip = null;
        }
    };

    _getContainer() {
        if (!this.cmContainer) {
            this.cmContainer = document.createElement('div');
            document.body.appendChild(this.cmContainer);
        }
        return this.cmContainer;
    }

    _createTreeNode = (node) => {
        const {treeData, userName} = this.props;
        const {selectedKey, modalType} = this.state;
        let createTime = new Date().toLocaleString();
        let guid = getGUID();
        let newNode = {
            title: node.title,
            id: guid,
            type: modalType,
            createAt: createTime,
            author: userName,
            lastUpdate: createTime
        };
        insertTreeNode(newNode).then(response => {
            if (insertNode(modalType, selectedKey, treeData, newNode)) {
                modalType === 2 && this.props.updateArticle(newNode);

                this.setState({showEditModal: false});
            }
        })
    };
    _updateFolderNode = (node) => {
        node.id = this.state.selectedKey;
        updateFolder(node).then(response => {
            message.success(response.msg);
            const {treeData} = this.props;
            if (updateNode(node.id, node, treeData)) {
                this.setState({showEditModal: false});
            }
        });
    };

    //render UI
    renderMenu({pageX, pageY}) {
        const {modalType} = this.state;
        if (this.toolTip) {
            ReactDOM.unmountComponentAtNode(this.cmContainer);
            this.toolTip = null;
        }
        this.toolTip = (
            <Menu style={{position: "relative", zIndex: '1', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'}}>
                <Menu.Item id="1" onClick={this.onRename} disabled={modalType === 2}>
                    <Icon type="form"/>
                    <span>Rename</span>
                </Menu.Item>
                <Menu.Item id="2" onClick={this.onNewFolder} disabled={modalType === 2}>
                    <Icon type="folder"/>
                    <span>New Folder</span>
                </Menu.Item>
                <Menu.Item id="2" onClick={this.onNewFile} disabled={modalType === 2}>
                    <Icon type="file"/>
                    <span>New File</span>
                </Menu.Item>
                <Menu.Item id="4" onClick={this.onDelete}>
                    <Icon type="delete"/>
                    <span>Delete</span>
                </Menu.Item>
            </Menu>
        );

        const container = this._getContainer();
        Object.assign(this.cmContainer.style, {
            position: 'absolute',
            left: `${pageX}px`,
            top: `${pageY}px`,
        });

        ReactDOM.render(this.toolTip, container);
    }

    render() {
        const {showEditModal, modalType, searchValue, expandedKeys, autoExpandParent} = this.state;
        const renderTreeNodes = data =>
            data.map(item => {
                const index = item.title.indexOf(searchValue);
                const beforeStr = item.title.substr(0, index);
                const afterStr = item.title.substr(index + searchValue.length);
                const title =
                    index > -1 ? (
                        <Tooltip title={item.title}><span>
                            {beforeStr}
                            <span style={{color: '#f50', background: '#fcc666'}}>{searchValue}</span>
                            {afterStr}
                        </span></Tooltip>
                    ) : (
                        <Tooltip title={item.title}><span>{item.title}</span></Tooltip>
                    );

                if (item.children) {
                    return (
                        <TreeNode title={title} key={item.id} dataRef={item} isLeaf={item.type === 2}>
                            {renderTreeNodes(item.children)}
                        </TreeNode>
                    );
                }
                return <TreeNode key={item.id} title={title} dataRef={item} isLeaf={item.type === 2}/>
            });
        return (
            <>
                <Search style={{marginBottom: 8}} placeholder="搜索" onChange={this.onSearch}/>
                <Spin spinning={this.props.isLoading}>
                    <DirectoryTree onSelect={this.onSelect}
                                   onRightClick={this.onRightClick}
                                   blockNode
                                   expandedKeys={expandedKeys}
                                   autoExpandParent={autoExpandParent}
                                   onExpand={this.onExpand}>
                        {renderTreeNodes(this.props.treeData)}
                    </DirectoryTree>
                </Spin>
                <AddFileModal visible={showEditModal}
                              editNode={editNode}
                              modalType={modalType}
                              handleOk={this.handleModalOk}
                              handleCancel={this.handleModalCancel}
                              wrappedComponentRef={this._saveFormRef}/>
            </>
        );
    }
}

export default connect(mapStateToProps, {loadTreeData, deleteTreeNode, updateArticle})(ArticlesTree);
