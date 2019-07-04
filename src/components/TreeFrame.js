import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Tree, Icon, Menu, Input} from 'antd';

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
const insertNode = (type, key, tree) => {
    let node = {};
    switch (type) {
        case 1:
            node = {title: 'folder1', key: 'folder1'};
            break;
        case 2:
            node = {title: 'file1', key: 'file1'};
            break;
        default:
            node = {title: 'folder1', key: 'folder1'};
            break;
    }

    for (let i = 0; i < tree.length; i++) {
        if (tree[i].key === key) {
            if (!tree[i].children) {
                tree[i].children = [];
            }
            tree[i].children.push(node);
            return true;
        }
        if (tree[i].children && insertNode(type, key, tree[i].children)) {
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
const dataList = [];
const generateList = data => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const {key} = node;
        dataList.push({key, title: key});
        if (node.children) {
            generateList(node.children);
        }
    }
};


class TreeFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: [],
            treeData: treeData,
            searchValue: ''
        }
    }

    componentDidMount() {
        generateList(this.state.treeData);
        document.addEventListener('click', this._handleClickOutside);
        document.addEventListener('scroll', this._handleScroll);
    };

    componentWillUnmount() {
        document.removeEventListener('click', this._handleClickOutside);
        document.removeEventListener('scroll', this._handleScroll);
    }

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
        const {selectedKey, treeData} = this.state;
        if (insertNode(1, selectedKey, treeData)) {
            this.setState({treeData});
        }
    };
    onNewFile = () => {
        const {selectedKey, treeData} = this.state;
        if (insertNode(2, selectedKey, treeData)) {
            this.setState({treeData});
        }
    };
    onDelete = () => {
        const {selectedKey, treeData} = this.state;
        if (deleteNode(2, selectedKey, treeData)) {
            this.setState({treeData});
        }
    };
    onSearch = e => {
        const {value} = e.target;
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

    renderTreeNodes = data =>
        data.map(item => {
            const {searchValue} = this.state;
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
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });


    render() {
        return (
            <>
                <Search style={{marginBottom: 8}} placeholder="Search" onChange={this.onSearch}/>
                <Tree defaultExpandedKeys={['0-0-0']} onSelect={this.onSelect} onRightClick={this.onRightClick}
                      blockNode>
                    {this.renderTreeNodes(this.state.treeData)}
                </Tree>
            </>
        );
    }

};
export default TreeFrame;