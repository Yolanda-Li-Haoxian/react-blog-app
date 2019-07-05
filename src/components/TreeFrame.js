import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Tree, Icon, Menu, Input, Modal} from 'antd';
import AddFileModal from './modal/AddFileModal'

const {Search} = Input;
const {TreeNode} = Tree;
const treeData = [
    {
        title: '0-0',
        key: '0-0',
        parentKey: '',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                parentKey: '0-0',
                type: '1',
                children: [
                    {title: '0-0-0-0', key: '0-0-0-0'},
                    {title: '0-0-0-1', key: '0-0-0-1'},
                    {title: '0-0-0-2', key: '0-0-0-2'},
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                parentKey: '0-0',
                children: [
                    {title: '0-0-1-0', key: '0-0-1-0'},
                    {title: '0-0-1-1', key: '0-0-1-1'},
                    {title: '0-0-1-2', key: '0-0-1-2'},
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
                parentKey: '0-0',
            },
            {key: '0-0-3', author: 'lhx', date: '2019.6.27', title: 'title1', value: 'value1'},
            {key: '0-0-4', author: 'hx1', date: '2019.6.28', title: 'title2', value: 'value2'}
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        parentKey: '',
        children: [
            {title: '0-1-0-0', key: '0-1-0-0'},
            {title: '0-1-0-1', key: '0-1-0-1'},
            {title: '0-1-0-2', key: '0-1-0-2'},
        ],
    },
    {
        title: '0-2',
        key: '0-2',
        parentKey: ''
    },
];
const dataList = [];
const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};
const insertNode = (type, key, tree, node) => {
    let newNode = {};
    switch (type) {
        case 1:
            newNode = {title: node.title, key: 'folder1'};
            break;
        case 2:
            newNode = {title: node.title, key: 'file1'};
            break;
        default:
            newNode = {title: 'folder1', key: 'folder1'};
            break;
    }

    for (let i = 0; i < tree.length; i++) {
        if (tree[i].key === key) {
            if (!tree[i].children) {
                tree[i].children = [];
            }
            tree[i].children.push(newNode);
            dataList.push(newNode);
            return true;
        }
        if (tree[i].children && insertNode(type, key, tree[i].children, node)) {
            return true;
        }
    }
    return false;
};
const deleteNode = (type, key, tree) => {
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].key === key) {
            tree.splice(i, 1);
            return true;
        }
        if (tree[i].children && deleteNode(type, key, tree[i].children)) {
            return true;
        }
    }
    return false;
}
const generateList = data => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const {key, title} = node;
        dataList.push({key, title});
        if (node.children) {
            generateList(node.children);
        }
    }
};

generateList(treeData);

class TreeFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: [],
            treeData: treeData,
            searchValue: '',
            visible: false,
            expandedKeys: [],
            autoExpandParent: true
        }
    }

    //Life cycle of component
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
        console.log('selected', selectedKeys, info);
    };
    onRightClick = ({event, node}) => {
        this.setState({
                selectedKey: node.props.eventKey
            }
        );
        this.renderMenu(event, node);
    };
    onNewFolder = () => {
        this.setState({visible: true, modalType: 1});
    };
    onNewFile = () => {
        this.setState({visible: true, modalType: 2})
    };
    onDelete = () => {
        const {selectedKey, treeData} = this.state;
        const {confirm} = Modal;
        const that = this;
        confirm({
            title: 'Do you Want to delete these items?',
            content: 'When clicked the OK button,将无法恢复',
            onOk() {
                if (deleteNode(2, selectedKey, treeData)) {
                    that.setState({treeData});
                }
            },
            onCancel() {

            },
        });
    };
    onSearch = e => {
        const {value} = e.target;
        const {treeData} = this.state;
        const expandedKeys = dataList.map(item => {
            if (item.title.indexOf(value) > -1) {
                return getParentKey(item.key, treeData);
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
    handleOk = e => {
        const {selectedKey, treeData} = this.state;
        const {form, modalType} = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            form.resetFields();
            if (insertNode(modalType, selectedKey, treeData, values)) {
                this.setState({treeData});
            }
            this.setState({
                visible: false,
            });
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    _saveFormRef = formRef => {
        this.formRef = formRef;
    };


    //static function
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

    //render UI
    renderMenu(event, info) {
        if (this.toolTip) {
            ReactDOM.unmountComponentAtNode(this.cmContainer);
            this.toolTip = null;
        }
        this.toolTip = (
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="vertical" theme="light">
                <Menu.Item key="1" onClick={this.onNewFolder}>
                    <Icon type="folder"/>
                    <span>New Folder</span>
                </Menu.Item>
                <Menu.Item key="2" onClick={this.onNewFile}>
                    <Icon type="file"/>
                    <span>New File</span>
                </Menu.Item>
                <Menu.Item key="3" onClick={this.onDelete}>
                    <Icon type="delete"/>
                    <span>Delete</span>
                </Menu.Item>
            </Menu>
        );

        const container = this._getContainer();
        Object.assign(this.cmContainer.style, {
            position: 'absolute',
            left: `${event.pageX}px`,
            top: `${event.pageY}px`,
        });

        ReactDOM.render(this.toolTip, container);
    }

    render() {
        const {visible, modalType, searchValue, expandedKeys, autoExpandParent} = this.state;
        const renderTreeNodes = data =>
            data.map(item => {
                const index = item.title.indexOf(searchValue);
                const beforeStr = item.title.substr(0, index);
                const afterStr = item.title.substr(index + searchValue.length);
                const title =
                    index > -1 ? (
                        <span>
                            {beforeStr}
                            <span style={{color: '#f50'}}>{searchValue}</span>
                            {afterStr}
                        </span>
                    ) : (
                        <span>{item.title}</span>
                    );

                if (item.children) {
                    return (
                        <TreeNode title={title} key={item.key} dataRef={item}>
                            {renderTreeNodes(item.children)}
                        </TreeNode>
                    );
                }
                // return <TreeNode {...item} />;
                return <TreeNode key={item.key} title={title}/>;
            });
        return (
            <>
                <Search style={{marginBottom: 8}} placeholder="Search" onChange={this.onSearch}/>
                <Tree onSelect={this.onSelect}
                      onRightClick={this.onRightClick}
                      blockNode
                      expandedKeys={expandedKeys}
                      autoExpandParent={autoExpandParent}
                      onExpand={this.onExpand}>
                    {renderTreeNodes(this.state.treeData)}
                </Tree>
                <AddFileModal visible={visible}
                              modalType={modalType}
                              handleOk={this.handleOk}
                              handleCancel={this.handleCancel}
                              wrappedComponentRef={this._saveFormRef}/>
            </>
        );
    }
}

export default TreeFrame;