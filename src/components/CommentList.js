import React, {Component} from 'react';
import {Comment, Avatar, Form, Button, List, Input, Tooltip, Icon} from 'antd';
import moment from 'moment';

import {getCommentsByArticleId, addComment, updateComment,removeComment} from '../services/httpRequest';
import {getGUID, getUser} from '../services/commenSrv'

const {TextArea} = Input;
const userName = getUser().userName;
const Editor = ({onChange, onSubmit, submitting, value}) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} placeholder='想对作者说点什么'/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </div>
);

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
        removeComment(this.state.comment.id).then(()=>{
            this.props.delete();
        });
    };

    render() {
        const {author, content, dateTime, likes, dislikes} = this.state.comment;
        const datetime = moment(dateTime).format('YYYY-MM-DD HH:mm:ss');
        const actions = [
            <span key="comment-basic-like">
                <Tooltip title="Like">
                  <Icon
                      type="like"
                      theme={this.state.action === 'liked' ? 'filled' : 'outlined'}
                      onClick={this.like}
                  />
                </Tooltip>
                <span style={{paddingLeft: 8, cursor: 'auto'}}>{likes}</span>
            </span>,
            <span key=' key="comment-basic-dislike"'>
                <Tooltip title="Dislike">
                  <Icon
                      type="dislike"
                      theme={this.state.action === 'disliked' ? 'filled' : 'outlined'}
                      onClick={this.dislike}
                  />
                </Tooltip>
                <span style={{paddingLeft: 8, cursor: 'auto'}}>{dislikes}</span>
            </span>
        ];
        if (userName === author) {
            actions.push(
                <span key="comment-basic-edit">Edit</span>,
                <span key="comment-basic-delete" onClick={this.delete}>Delete</span>);
        } else {
            actions.push(<span key="comment-basic-reply-to">Reply to</span>);
        }
        return <Comment actions={actions}
                        author={author}
                        avatar={<Avatar icon='user'/>}
                        content={content}
                        datetime={datetime}/>
    }
}


class CommentList extends Component {
    state = {
        comments: [],
        submitting: false,
        value: ''
    };


    componentDidMount() {
        getCommentsByArticleId(this.props.articleId).then(data => {
            this.setState({comments: data});
        });
    }

    handleDelete = (index) => {
        const {comments} = this.state;
        comments.splice(index, 1);
        this.setState({comments});
    }

    handleSubmit = () => {
        const {value} = this.state;
        if (!value) {
            return;
        }

        this.setState({
            submitting: true,
        });
        const dateTime = new Date().getTime();
        const id = getGUID();
        const para = {
            id,
            articleId: this.props.articleId,
            author: userName,
            content: value,
            dateTime,
            likes: 0,
            dislikes: 0,
            avatar: ''
        }
        addComment(para).then(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    para,
                    ...this.state.comments
                ]
            });
        });
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const {comments, submitting, value} = this.state;
        return (
            <>
                <Comment
                    avatar={
                        <Avatar
                            icon="user"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
                {comments.length > 0 &&
                <List
                    dataSource={comments}
                    itemLayout="horizontal"
                    renderItem={(item, index) => {
                        return <li><CommentDetail key={item.id} delete={this.handleDelete.bind(this, index)} comment={item}/>
                        </li>
                    }}
                />}
            </>
        );
    }
}

export default CommentList;