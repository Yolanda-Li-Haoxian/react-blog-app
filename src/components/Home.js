import React ,{Component} from 'react';
import '../styles/App.css';
import 'antd/dist/antd.css';
import TreeFrame from './TreeFrame'
// import Header from './components/Header';
// import Content from './components/Content';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import BlogContent from "./Article";
const {Header, Content, Footer, Sider} = Layout;

export default class Home extends Component {
    render(){
        // console.log(this.props);
        return (
            <Layout style={{height: '100%'}}>
                <Header className="header">
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px', height: '100%'}}>
                    <Layout style={{padding: '24px 0', background: '#fff', height: '100%'}}>
                        <Sider width={300} style={{background: '#fff'}}>
                            <TreeFrame/>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280, height: '100%'}} id="scroll1">
                            <BlogContent/>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Blog Dev ©2019 Created by Yolanda Li</Footer>
            </Layout>
        );
    }
}


