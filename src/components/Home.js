import React ,{Component} from 'react';
import {connect} from 'react-redux';
import '../styles/App.css';
import 'antd/dist/antd.css';
import TreeFrame from './TreeFrame'
import {Layout, Menu, Modal, Icon,Button} from 'antd';
import BlogContent from "./Article";
import {logout} from "../actions/user";
const {Header, Content, Footer, Sider} = Layout;
const { confirm } = Modal;

const mapStateToProps = state=>({
    userName:state.user.userName
});
class Home extends Component {
    onExit=()=>{
        confirm({
            title: 'Do you Want to exit this current account?',
            content: 'It will go to the login page.',
            onOk:()=> {
                console.log(this.props);
                this.props.logout()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    render(){
        const user= this.props.userName;
        return (
            <Layout style={{height: '100%'}}>
                <Header className="header">
                    <h1 style={{color:'#fff',display:'inline-block'}}>Hello {user}</h1>
                    <Button type='link' style={{float:'right',lineHeight:'inherit'}} onClick={this.onExit}>Exit</Button>
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

export default connect(mapStateToProps,{logout})(Home);


