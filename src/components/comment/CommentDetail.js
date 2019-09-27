import React, {Component} from 'react';
import {Comment, Avatar, Tooltip, Icon} from 'antd';
import moment from 'moment';
import {connect} from 'react-redux';

import {deleteCommentFromList} from "../../actions/comment";
import {updateComment} from '../../services/httpRequest';

const mapStateToProps = (state) => {
    return {
        userName: state.user.userName
    }
}

class CommentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: {},
            action: null
        }
    }

    componentDidMount() {
        this.setState({
            comment: this.props.comment
        })
    }

    like = () => {
        const {action, comment} = this.state;
        if (action === 'liked') {
            const likes = --comment.likes;
            this.setState({
                comment: {...this.state.comment, likes},
                action: null,
            });
        } else if (action === 'disliked') {
            const likes = ++comment.likes;
            const dislikes = --comment.dislikes;
            this.setState({
                comment: {...this.state.comment, likes, dislikes},
                action: 'liked',
            });
        } else {
            const likes = ++comment.likes;
            this.setState({
                comment: {...this.state.comment, likes},
                action: 'liked',
            });
        }
        updateComment({likes: comment.likes, dislikes: comment.dislikes}).then((res) => {
            console.log('update comment successfully', res.id);
        });
    };

    dislike = () => {
        const {action, comment} = this.state;
        if (action === 'liked') {
            const likes = --comment.likes;
            const dislikes = ++comment.dislikes;
            this.setState({
                comment: {...this.state.comment, likes, dislikes},
                action: 'disliked',
            });
        } else if (action === 'disliked') {
            const dislikes = --comment.dislikes;
            this.setState({
                comment: {...this.state.comment, dislikes},
                action: null,
            });
        } else {
            const dislikes = ++comment.dislikes;
            this.setState({
                comment: {...this.state.comment, dislikes},
                action: 'disliked',
            });
        }
        updateComment({likes: comment.likes, dislikes: comment.dislikes}).then((res) => {
            console.log('update comment successfully', res.id);
        });
    };

    delete = () => {
        this.props.deleteCommentFromList(this.state.comment.id);
    };

    render() {
        const {author, content, dateTime, likes, dislikes} = this.state.comment;
        const datetime = moment(dateTime).format('YYYY-MM-DD HH:mm:ss');
        const actions = [
            <span key="comment-basic-like">
                <Tooltip title="赞">
                  <Icon
                      type="like"
                      theme={this.state.action === 'liked' ? 'filled' : 'outlined'}
                      onClick={this.like}
                  />
                </Tooltip>
                <span style={{paddingLeft: 8, cursor: 'auto'}}>{likes}</span>
            </span>,
            <span key="comment-basic-dislike">
                <Tooltip title="踩">
                  <Icon
                      type="dislike"
                      theme={this.state.action === 'disliked' ? 'filled' : 'outlined'}
                      onClick={this.dislike}
                  />
                </Tooltip>
                <span style={{paddingLeft: 8, cursor: 'auto'}}>{dislikes}</span>
            </span>
        ];
        if (this.props.userName === author) {
            actions.push(
                <span key="comment-basic-edit">修改</span>,
                <span key="comment-basic-delete" onClick={this.delete}>删除</span>);
        } else {
            actions.push(<span key="comment-basic-reply-to">回复</span>);
        }
        return <Comment actions={actions}
                        author={author}
                        avatar={<Avatar icon='user'/>}
                        content={content}
                        datetime={datetime}/>
    }
}

export default connect(mapStateToProps, {deleteCommentFromList})(CommentDetail);
