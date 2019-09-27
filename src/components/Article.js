/**
 * Created by lihaoxian on 2019/6/25.
 */
import React, {Component, createRef} from 'react';
import {connect} from 'react-redux';
import E from 'wangeditor';
import moment from 'moment';
import {Input, Button, message, Typography, Descriptions} from 'antd';

import {updateArticleNode} from '../actions/directoryTree';
import {updateArticleSrv} from '../services/httpRequest';

const {Title} = Typography;

const mapStateToProps = (state) => {
    return {
        // article: state.article.articleData,
        treeData: state.directoryTree.treeData,
        // isLoading: state.directoryTree.isLoading  //首次加载时显示第一篇文章
    }
};


class Article extends Component {
    constructor(props) {
        super(props);
        this.editorRef = createRef();
        this.state = {
            preview: true,
            article: {}
        };
    }

    componentWillMount() {
        this.showEditBtn = this.props.showEditBtn;
        this.setState({article: this.props.article});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            article: {...nextProps.article}
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.article.id !== prevProps.article.id && !this.state.preview) {
            message.warning('Please save the current article first.');
            return;
        }
    }


    //UI event
    onChangeTitle = (e) => {
        this.title = e.target.value;
    };
    onEdit = () => {
        this.title = this.state.article.title;
        this.setState({
            preview: false,
        }, () => {
            this._initEditor();
        });
    };
    onSave = () => {
        const title = this.title;
        if (!title) {
            message.error('Please Input the title.');
            return;
        }
        const {id} = this.state.article;
        const value = this.editor.txt.html();
        const lastUpdate = new Date().getTime();
        const node = {id, title, value, lastUpdate};
        updateArticleSrv(node).then(response => {
            this.props.updateArticleNode(node, this.props.treeData);
            message.success(response.msg);
            this.setState({
                preview: true,
                article: {...this.state.article, title, value, lastUpdate}
            });
        });

    };
    onCancel = () => {
        this.setState({
            preview: true,
        });
    }

    //static function
    _initEditor = () => {
        this.editor = new E(this.editorRef.current);
        this.editor.customConfig.zIndex = 1;
        this.editor.create();
        this.editor.txt.html(this.state.article.value);
    }


    //render UI
    render() {
        const {preview} = this.state;
        const {title, value, author, createAt, lastUpdate} = this.state.article;
        const updateTime = lastUpdate && moment(lastUpdate).format('YYYY-MM-DD HH:mm:ss');
        const createTime = createAt && moment(createAt).format('YYYY-MM-DD HH:mm:ss');
        if (preview) {
            //preview mode
            return (
                <>
                    <Title level={3} ellipsis style={{width: '90%', display: 'inline-block'}}>{title}</Title>
                    {this.showEditBtn ?
                        <Button disabled={!title} style={{float: 'right'}} type="link" icon="edit"
                                size='large'
                                onClick={this.onEdit}>编辑</Button>
                        : null}
                    {title ?
                        <Descriptions>
                            <Descriptions.Item label="创建者">{author}</Descriptions.Item>
                            <Descriptions.Item label="创建时间">{createTime}</Descriptions.Item>
                            <Descriptions.Item label="上次更新时间">{updateTime}</Descriptions.Item>
                        </Descriptions>
                        : null}
                    <div dangerouslySetInnerHTML={{__html: value}}/>
                </>
            )
        } else {
            //edit mode
            return (
                <>
                    <Input size="large" placeholder="Title..." onChange={this.onChangeTitle}
                           style={{marginBottom: '12px', marginRight: '12px', width: '90%', color: '#40a9ff'}}
                           defaultValue={title}/>
                    <Button type="primary" onClick={this.onSave}>保存</Button>
                    <Button type="link" onClick={this.onCancel}>取消</Button>
                    <div ref={this.editorRef} className='wangeditor'/>
                </>
            )
        }
    }
}

export default connect(mapStateToProps, {updateArticleNode})(Article);
// export default Article;
