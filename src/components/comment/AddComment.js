import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Comment, Avatar, Form, Button, Input,} from 'antd';
import {addCommentToList} from '../../actions/comment';
import {getGUID} from "../../services/commenSrv";

const {TextArea} = Input;
const mapStateToProps = (state) => (
    {
        submitting: state.comment.submitting,
        userName: state.user.userName
    }
)
const Editor = ({onChange, onSubmit, submitting, value}) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} placeholder='想对作者说点什么'/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                发表评论
            </Button>
        </Form.Item>
    </div>
);

class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            value: ''
        }
    }

    handleSubmit = () => {
        const {value} = this.state;
        const {userName} = this.props;
        if (!value) {
            return;
        }
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
        this.props.addCommentToList(para);
        this.setState({
            value: ''
        });
    };
    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const {value} = this.state;
        const {submitting} = this.props;
        return <Comment
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
    }
}

export default connect(mapStateToProps, {addCommentToList})(AddComment);