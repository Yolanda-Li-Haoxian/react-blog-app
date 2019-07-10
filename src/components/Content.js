/**
 * Created by lihaoxian on 2019/6/25.
 */
import React, {Component, createRef} from 'react';
import E from 'wangeditor';
import {Input, Button, message, BackTop} from 'antd';
import emitter from '../events';
import {updateArticle} from '../services/httpRequest'

let editMode = false;
let blogIndex = 0;
let treeNodeKey = '';

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

    //life cycle
    componentDidMount() {
        // 声明一个自定义事件
        // 在组件装载完成以后
        this.eventCreateEmitter = emitter.on("updateContent", (type, blog) => {
            treeNodeKey = blog.id;
            if (type === 'selectedTreeNode') {
                editMode = true;
                this.setState({
                    preview: true,
                    value: blog.value,
                    title: blog.title
                })

            } else if (type === 'onCreateNode') {
                editMode = true;
                this.setState({
                    preview: false,
                    value: '',
                    title: blog.title
                }, () => {
                    this._initEditor();
                })
            }
        });
    }

    componentWillUnmount() {
        // emitter.removeListener(this.eventCreateEmitter);
        console.log('content componentWillUnmount')
    }

    //UI event
    onChangeTitle = (e) => {
        this.setState({title: e.target.value});
    };
    onEdit = () => {
        editMode = true;
        this.setState({
            preview: false,
        }, () => {
            this._initEditor();
        });
    };
    onSave = () => {
        const title = this.state.title;
        if (!title) {
            message.error('Please Input the title.');
            return;
        }
        const value = this.editor.txt.html();
        const node = {id: treeNodeKey, title, value};
        updateArticle(node).then(response => {
            message.success(response.msg);
            emitter.emit('updateTreeNode', node);
            this.setState({
                preview: true,
                value
            });
        });

    };

    onCreate = () => {
        editMode = false;
        this.setState({
            preview: false,
            value: '',
            title: ''
        })
    }

    //static function
    static addToList(value, title) {
        const blog = {id: treeNodeKey, title: title, value: value, author: 'lhxxx', date: new Date().toLocaleString()}
        emitter.emit('updateTreeNode', blog);
    }

    _initEditor = () => {
        this.editor = new E(this.editorRef.current);
        this.editor.customConfig.zIndex = 1;
        this.editor.create();
        this.editor.txt.html(this.state.value);
    }


    //render UI
    render() {
        const {preview, value, title} = this.state;
        if (preview) {
            //preview mode
            return (
                <div style={{borderLeft: '1px solid #ccc', padding: '0 10px', height: '100%', overflowY: 'auto'}}
                     id="scroll">
                    <BackTop target={() => document.getElementById('scroll')}/>
                    <h1 style={{width: '90%', display: 'inline-block'}}>{title}</h1>
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

export default BlogContent;