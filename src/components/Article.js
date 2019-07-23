/**
 * Created by lihaoxian on 2019/6/25.
 */
import React, {Component, createRef} from 'react';
import {connect} from 'react-redux';
import E from 'wangeditor';
import moment from 'moment';
import {Input, Button, message, BackTop, Typography, Descriptions} from 'antd';
import {initArticle} from '../actions/article';
import {updateArticleNode} from '../actions/directoryTree';
import {updateArticleSrv} from '../services/httpRequest';

const {Title} = Typography;

const mapStateToProps = (state) => {
    return {
        article: state.article.articleData,
        treeData: state.directoryTree.treeData,
        // isLoading: state.directoryTree.isLoading  //首次加载时显示第一篇文章
    }
};

class BlogContent extends Component {
    constructor(props) {
        super(props);
        this.editorRef = createRef();
        this.state = {
            preview: true,
            lastUpdate: '',
            title: ''
        }
    }

    componentDidUpdate(prevProps, prevState) {
        //     //第一次加载第一篇文章
        //     if(prevProps.isLoading&&!prevProps.article.id){
        //         console.log('Component DID UPDATE!',this.props.treeData)
        //     }

        if (this.props.article.id !== prevProps.article.id && !this.state.preview) {
            message.warning('Please save the current article first.');
            return;
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.article.title,
            lastUpdate: nextProps.article.lastUpdate
        });
    }

    //UI event
    onChangeTitle = (e) => {
        this.setState({title: e.target.value});
    };
    onEdit = () => {
        this.setState({
            preview: false,
        }, () => {
            this._initEditor();
        });
    };
    onSave = () => {
        const {title} = this.state;
        if (!title) {
            message.error('Please Input the title.');
            return;
        }
        const {id} = this.props.article;
        const value = this.editor.txt.html();
        const lastUpdate = new Date().getTime();
        const node = {id, title, value, lastUpdate};
        updateArticleSrv(node).then(response => {
            this.props.updateArticleNode(node, this.props.treeData);
            message.success(response.msg);
            this.setState({
                preview: true,
                title,
                lastUpdate
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
        this.editor.txt.html(this.props.article.value);
    }


    //render UI
    render() {
        const {preview, lastUpdate, title} = this.state;
        const {value, author, createAt} = this.props.article;
        const updateTime = lastUpdate && moment(lastUpdate).format('YYYY-MM-DD HH:mm:ss');
        const createTime = createAt && moment(createAt).format('YYYY-MM-DD HH:mm:ss');
        if (preview) {
            //preview mode
            return (
                <div style={{borderLeft: '1px solid #ccc', padding: '0 10px', height: '100%', overflowY: 'auto'}}
                     id="scroll">
                    <BackTop target={() => document.getElementById('scroll')}/>
                    <Title level={3} ellipsis style={{width: '90%', display: 'inline-block'}}>{title}</Title>
                    <Button disabled={!title} style={{float: 'right'}} type="link" icon="edit" size='large'
                            onClick={this.onEdit}>Edit</Button>
                    {title ?

                        <Descriptions>
                            <Descriptions.Item label="Created">{author}</Descriptions.Item>
                            <Descriptions.Item label="Creation Time">{createTime}</Descriptions.Item>
                            <Descriptions.Item label="Last update Time">{updateTime}</Descriptions.Item>
                        </Descriptions>
                        : null}
                    <div dangerouslySetInnerHTML={{__html: value}}/>
                </div>
            )
        } else {
            //edit mode
            return (
                <>
                    <Input size="large" placeholder="Title..." onChange={this.onChangeTitle}
                           style={{marginBottom: '12px', marginRight: '12px', width: '90%', color: '#40a9ff'}}
                           defaultValue={title}/>
                    <Button type="primary" onClick={this.onSave}>Save</Button>
                    <Button type="link" onClick={this.onCancel}>Cancel</Button>
                    <div ref={this.editorRef} className='wangeditor'/>
                </>
            )
        }
    }
}

export default connect(mapStateToProps, {initArticle, updateArticleNode})(BlogContent);