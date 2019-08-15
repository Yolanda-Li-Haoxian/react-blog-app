import React, {Component} from 'react';
import {List} from 'antd';

import {connect} from 'react-redux';

import {getCommentsList, deleteCommentFromList} from "../../actions/comment";
import CommentDetail from '../comment/CommentDetail'


const mapStateToProps = (state) => {
    return {
        comments: state.comment.commentList,
        isLoaded: state.comment.isLoaded
    }
}

class CommentList extends Component {
    componentDidMount() {
        this.props.getCommentsList(this.props.articleId);
    }
    render() {
        const {comments, isLoaded} = this.props;
        return (
            <>
                {comments.length > 0 &&
                <List
                    dataSource={comments}
                    loading={!isLoaded}
                    itemLayout="horizontal"
                    renderItem={item => {
                        return <li><CommentDetail key={item.id} comment={item}/>
                        </li>
                    }}
                />}
            </>
        );
    }
}

export default connect(mapStateToProps, {getCommentsList, deleteCommentFromList})(CommentList);
