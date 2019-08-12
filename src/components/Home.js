import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import '../styles/App.css';
import 'antd/dist/antd.css';
import MainHeader from './MainHeader';
import TreeFrame from './DirectoryTree'
import {Layout, Modal, Button, List, Descriptions, Icon, Dropdown, Menu} from 'antd';
import Article from "./Article";
import {getBlogArticles} from '../services/httpRequest';
import {updateArticle} from '../actions/article';
import {logout} from "../actions/user";

const {Header, Content, Footer, Sider} = Layout;
const {confirm} = Modal;
const IconText = ({type, text}) => (
    <span>
        <Icon type={type} style={{marginRight: 8}}/>
        {text}
    </span>
);

const mapStateToProps = state => ({
    userName: state.user.userName
});


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleList: [],
            article: {}
        };
    }

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

    componentDidMount() {
        getBlogArticles().then(response=> {
            if(response.data.status===200){
                this.setState({articleList:response.data.data});
            }
        });
    }

    render() {
        const user = this.props.userName;
        const {articleList} = this.state;
        return (
            <Layout style={{height: '100%'}}>
                <MainHeader userName={user}/>
                <Content style={{padding: '0 50px', height: '100%',overflowY:'auto'}}>
                    <List dataSource={articleList} itemLayout='vertical'
                          renderItem={item => (
                              <List.Item key={item.id} actions={[
                                  <IconText type="star-o" text="156"/>,
                                  <IconText type="like-o" text="156"/>,
                                  <IconText type="message" text="2"/>,
                              ]}>
                                  <List.Item.Meta title={
                                      <Link to={{
                                          pathname:'/articleDetails',
                                          search:JSON.stringify(item),
                                          state: {article:item}
                                      }}
                                            target='_blank'
                                      >{item.title}</Link>
                                  }
                                                  description={
                                                      <Descriptions>
                                                          <Descriptions.Item
                                                              label="Created">{item.author}</Descriptions.Item>
                                                          <Descriptions.Item
                                                              label="Creation Time">{item.createTime}</Descriptions.Item>
                                                          <Descriptions.Item
                                                              label="Last update Time">{item.updateTime}</Descriptions.Item>
                                                      </Descriptions>
                                                  }/>
                              </List.Item>
                          )}
                    />
                </Content>
                <Footer style={{textAlign: 'center'}}>Blog Dev ©2019 Created by Yolanda Li</Footer>
            </Layout>
        );
    }
}

export default connect(mapStateToProps, {logout, updateArticle})(Home);


