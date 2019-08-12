import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Layout,Button,Dropdown,Menu,Icon} from 'antd';
const {Header}  = Layout;
const menu = (
    <Menu>
        <Menu.Item>
            <Link to={{pathname:'/articlesMgr'}} target="_blank" >My Articles</Link>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                2nd menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                3rd menu item
            </a>
        </Menu.Item>
    </Menu>
);
class MainHeader extends Component {
    render() {
        const {userName} = this.props;
        return (
            <Header className="header">
                <h1 style={{color: '#fff', display: 'inline-block'}}>Hello {userName}</h1>

                <Button type='link' style={{float: 'right', lineHeight: 'inherit'}}
                        onClick={this.onExit}>Exit</Button>
                <div style={{float: 'right', lineHeight: 'inherit'}}>
                    <Dropdown overlay={menu} placement="bottomRight">
                        <Button type='link'>
                            Menu<Icon type="down"/>
                        </Button>
                    </Dropdown>
                </div>
            </Header>
        );
    };
};
export default MainHeader