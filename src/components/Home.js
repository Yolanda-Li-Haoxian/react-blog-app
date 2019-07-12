import React ,{Component} from 'react';
import '../styles/App.css';
import 'antd/dist/antd.css';
import TreeFrame from './TreeFrame'
// import Header from './components/Header';
// import Content from './components/Content';
import {Layout, Menu, Modal, Icon,Button} from 'antd';
import BlogContent from "./Article";
const {Header, Content, Footer, Sider} = Layout;
const { confirm } = Modal;

export default class Home extends Component {
    onExit=()=>{
        confirm({
            title: 'Do you Want to exit this current account?',
            content: 'It will go to the login page.',
            onOk:()=> this.props.history.push('/login'),
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    onHeaderMenu=(e)=>{
        if(e.key==='exit'){
            confirm({
                title: 'Do you Want to exit this current account?',
                content: 'It will go to the login page.',
                onOk:()=> this.props.history.push('/login'),
                onCancel() {
                    console.log('Cancel');
                },
            });

        }
    };
    render(){
        const user= this.props.location.state.userName;
        return (
            <Layout style={{height: '100%'}}>
                <Header className="header">
                    <h1 style={{color:'#fff',display:'inline-block'}}>Hello {user}</h1>
                    <Button type='link' style={{float:'right',lineHeight:'inherit'}} onClick={this.onExit}>Exit</Button>
                    {/*<Menu*/}
                    {/*    theme="dark"*/}
                    {/*    mode="horizontal"*/}
                    {/*    defaultSelectedKeys={['2']}*/}
                    {/*    style={{lineHeight: '64px'}}*/}
                    {/*    onClick={this.onHeaderMenu}*/}
                    {/*>*/}

                    {/*    <Menu.Item key="1">nav 1</Menu.Item>*/}
                    {/*    <Menu.Item key="2">nav 2</Menu.Item>*/}
                    {/*    <Menu.Item key="exit" style={{float:'right'}}>Exit</Menu.Item>*/}
                    {/*</Menu>*/}
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


