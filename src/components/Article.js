/**
 * Created by lihaoxian on 2019/6/25.
 */
import React, {Component, createRef} from 'react';
import {connect} from 'react-redux';
import E from 'wangeditor';
import {Input, Button, message, BackTop} from 'antd';
import {initArticle} from '../actions/article';
import {updateArticleNode} from '../actions/directoryTree';
import {updateArticleSrv} from '../services/httpRequest';

const mapStateToProps = (state) => ({
    article: state.article,
    treeData:state.directoryTree.treeData
});

class BlogContent extends Component {
    constructor(props) {
        super(props);
        this.editorRef = createRef();
        this.state = {
            value: '',
            title: '',
            preview: true
        }
    }


    //UI event
    onChangeTitle = (e) => {
        this.props.article.title = e.target.value;
    };
    onEdit = () => {
        this.setState({
            preview: false,
        }, () => {
            this._initEditor();
        });
    };
    onSave = () => {
        const {id,title}=this.props.article;
        if (!title) {
            message.error('Please Input the title.');
            return;
        }
        const value = this.editor.txt.html();
        const node = {id, title, value};
        updateArticleSrv(node).then(response => {
            this.props.updateArticleNode(node,this.props.treeData);
            message.success(response.msg);
            this.setState({
                preview: true,
            });
        });

    };

    //static function
    _initEditor = () => {
        this.editor = new E(this.editorRef.current);
        this.editor.customConfig.zIndex = 1;
        this.editor.create();
        this.editor.txt.html(this.props.article.value);
    }
    _eventUpdateEmitter = (type, blog) => {
        if (type === 'selectedTreeNode') {
            this.setState({
                preview: true,
                value: blog.value,
                title: blog.title
            })

        } else if (type === 'onCreateNode') {
            this.setState({
                preview: false,
                value: '',
                title: blog.title
            }, () => {
                this._initEditor();
            })
        }
    }


    //render UI
    render() {
        const {preview} = this.state;
        const {value, title} = this.props.article;
        if (preview) {
            //preview mode
            return (
                <div style={{borderLeft: '1px solid #ccc', padding: '0 10px', height: '100%', overflowY: 'auto'}}
                     id="scroll">
                    <BackTop target={() => document.getElementById('scroll')}/>
                    <h1 style={{
                        width: '90%', display: 'inline-block', overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>{title}</h1>
                    <Button type="link" icon="edit" onClick={this.onEdit}>Edit</Button>
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
                    <div ref={this.editorRef} className='wangeditor'/>
                </>
            )
        }
    }
}

export default connect(mapStateToProps, {initArticle, updateArticleNode})(BlogContent);