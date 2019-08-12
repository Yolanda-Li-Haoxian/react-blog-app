import React, {Component} from 'react';
import {Comment, Avatar, Form, Button, List, Input, Tooltip, Icon} from 'antd';
import moment from 'moment';

const {TextArea} = Input;

const CommentList = ({comments}) => (
    <List
        dataSource={comments}
        // header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

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

class CommentDetails extends Component {
    state = {
        comments: [],
        submitting: false,
        value: '',
        likes: 0,
        dislikes: 0,
        action: null,
    };
    like = () => {
        this.setState({
            likes: 1,
            dislikes: 0,
            action: 'liked',
        });
    };

    dislike = () => {
        this.setState({
            likes: 0,
            dislikes: 1,
            action: 'disliked',
        });
    };
    actions = [
        <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
              type="like"
              theme={this.state.action === 'liked' ? 'filled' : 'outlined'}
              onClick={this.like}
          />
        </Tooltip>
        <span style={{paddingLeft: 8, cursor: 'auto'}}>{this.likes}</span>
      </span>,
        <span key=' key="comment-basic-dislike"'>
        <Tooltip title="Dislike">
          <Icon
              type="dislike"
              theme={this.state.action === 'disliked' ? 'filled' : 'outlined'}
              onClick={this.dislike}
          />
        </Tooltip>
        <span style={{paddingLeft: 8, cursor: 'auto'}}>{this.dislikes}</span>
      </span>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ];

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                        actions: this.actions,
                        author: 'Han Solo',
                        avatar: <Avatar icon='user'/>,
                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                    ...this.state.comments,
                ],
            });
        }, 1000);
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
                {comments.length > 0 && <CommentList comments={comments}/>}
            </>
        );
    }
}

export default CommentDetails;