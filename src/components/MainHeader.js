import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Layout,Button,Dropdown,Menu,Icon,Modal} from 'antd';
import {logout} from "../actions/user";
const {Header}  = Layout;
const {confirm} = Modal;
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
const mapStateToProps = state => ({
    userName: state.user.userName
});
class MainHeader extends Component {
    onExit = () => {
        confirm({
            title: 'Do you Want to exit this current account?',
            content: 'It will go to the login page.',
            onOk: () => {
                this.props.logout()
            },
            onCancel() {
                //nothing
            },
        });
    };
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
export default connect(mapStateToProps, {logout})(MainHeader);