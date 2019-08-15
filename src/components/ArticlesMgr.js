import React, {Component} from 'react';

import {Layout,BackTop} from 'antd';
import {connect} from 'react-redux';
import Article from './Article';
import TreeFrame from './DirectoryTree'
import MainHeader from "./MainHeader";
import CONST_JSON from '../define_const_json';
const {Content, Sider,Footer} = Layout;
const mapState = (state) => ({
    article: state.article.articleData,
    userName: state.user.userName
});

class ArticlesMgr extends Component {
    render() {
        const {userName,article} = this.props;
        return (
            <Layout style={{height: '100%'}}>
                <MainHeader userName={userName}/>
                <Layout>
                    <Sider width={300} style={{background: '#fff',padding:'20px'}}>
                        <TreeFrame/>
                    </Sider>
                    <Content style={{padding:'20px', minHeight: 280, height: '100%',borderLeft: '1px solid #ccc',overflowY:'auto'}} id="scroll">
                        <BackTop target={() => document.getElementById('scroll')}/>
                        <Article article={article} showEditBtn={true}/>
                    </Content>
                </Layout>
                <Footer style={{textAlign: 'center'}}>{CONST_JSON.FOOTER_WORDING}</Footer>
            </Layout>
        );
    }
}

export default connect(mapState)(ArticlesMgr);