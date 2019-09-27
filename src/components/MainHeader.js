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
            <Link to={{pathname:'/articlesMgr'}} target="_blank" >我的文章</Link>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                个人中心
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                设置
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
            title: '确认退出吗？',
            content: '退出将会回到登录页面。',
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
                <h1 style={{color: '#fff', display: 'inline-block'}}>Easy 博客欢迎你，{userName} 你好！</h1>

                <Button type='link' style={{float: 'right', lineHeight: 'inherit'}}
                        onClick={this.onExit}>退出</Button>
                <div style={{float: 'right', lineHeight: 'inherit'}}>
                    <Dropdown overlay={menu} placement="bottomRight">
                        <Button type='link'>
                            菜单<Icon type="down"/>
                        </Button>
                    </Dropdown>
                </div>
            </Header>
        );
    };
};
export default connect(mapStateToProps, {logout})(MainHeader);
