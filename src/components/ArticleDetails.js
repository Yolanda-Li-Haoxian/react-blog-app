import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout, List, Comment,Tooltip,BackTop} from 'antd';
import moment from 'moment';

import MainHeader from "./MainHeader";
import Article from "./Article";
import CommentDetails from "./CommentDetails";

const {Footer, Content} = Layout;

const mapStateToProps = state => ({
    userName: state.user.userName
});

class ArticleDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            commentList:[]
        }
    }
    componentWillMount() {
        if (this.props.location) {
            this.showEditBtn = false;
            if (this.props.location.state && this.props.location.state.article) {
                this.article = this.props.location.state.article
            } else {
                let search = this.props.location.search;
                search = search.substr(1, search.length);
                this.article = JSON.parse(decodeURI(search));
            }
        } else {
            this.showEditBtn = true;
        }
    }

    componentDidMount() {

    }

    render() {
        const user = this.props.userName;
        return (
            <Layout style={{height: '100%'}}>
                <MainHeader userName={user}/>
                <Content style={{padding: '20px',height:'100%',overflowY:'auto'}} id='scroll'>
                    <BackTop target={() => document.getElementById('scroll')}/>
                    <Article showEditBtn={this.showEditBtn} article={this.article}/>
                    <CommentDetails/>
                </Content>
                <Footer style={{textAlign: 'center'}}>Blog Dev ©2019 Created by Yolanda Li</Footer>
            </Layout>
        );
    };
};
export default connect(mapStateToProps)(ArticleDetails);