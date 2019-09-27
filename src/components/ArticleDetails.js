import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout, BackTop, Icon} from 'antd';

import MainHeader from "./MainHeader";
import Article from "./Article";
import CommentList from "./comment/CommentList";
import AddComment from "./comment/AddComment";
import CONST_JSON from "../define_const_json";

const {Footer, Content} = Layout;

const mapStateToProps = state => ({
    userName: state.user.userName
});
const IconText = ({type, text, handleClick, theme}) => (
    <span style={{marginRight: 20}}>
        <Icon type={type} style={{marginRight: 8, cursor: 'pointer'}} onClick={handleClick}
              theme={theme ? 'filled' : 'outlined'}/>
        {text}
    </span>
);

class ArticleDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentList: [],
            likes: 0,
            favorites: 0,
            likedAction: false,
            favoriteAction: false
        }
    }

    article = {};

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
        const {likes, favorites, commentsCount} = this.article;
        this.setState({
            likes,
            favorites,
            commentsCount
        });
    }

    like = () => {
        let {likes, likedAction} = this.state;
        if (likedAction) {
            this.setState({likes: --likes, likedAction: false});
        } else {
            this.setState({likes: ++likes, likedAction: true});
        }
    }
    favorite = () => {
        let {favorites, favoriteAction} = this.state;
        if (favoriteAction) {
            this.setState({favorites: --favorites, favoriteAction: false});
        } else {
            this.setState({favorites: ++favorites, favoriteAction: true});
        }
    }


    render() {
        const user = this.props.userName;
        const {likes, favorites, likedAction, favoriteAction, commentsCount} = this.state;
        return (
            <Layout style={{height: '100%'}}>
                <MainHeader userName={user}/>
                <Content style={{padding: '20px', height: '100%', overflowY: 'auto'}} id='scroll'>
                    <BackTop target={() => document.getElementById('scroll')}/>
                    <Article showEditBtn={this.showEditBtn} article={this.article}/>
                    <div style={{margin: '12px 0'}}>
                        <IconText type="like" text={likes + ' 赞同'} handleClick={this.like} theme={likedAction}/>
                        <IconText type="star" text={favorites + ' 收藏'} handleClick={this.favorite}
                                  theme={favoriteAction}/>
                        <IconText type="message" text={commentsCount + ' 条评论'}/>
                    </div>
                    <AddComment/>
                    <CommentList articleId={this.article.id}/>
                </Content>
                <Footer style={{textAlign: 'center'}}>{CONST_JSON.FOOTER_WORDING}</Footer>
            </Layout>
        );
    };
};
export default connect(mapStateToProps)(ArticleDetails);