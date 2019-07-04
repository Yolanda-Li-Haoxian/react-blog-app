/**
 * Created by lihaoxian on 2019/6/25.
 */
import React, {Component} from 'react';
// import {Container, Row, Col} from 'react-bootstrap';
import {Row, Col} from 'antd';
import emitter from '../events';
import CreateArticle from './CreateArticle';
import Article from './Article';
import BlogList from './BlogList';

let blogs = [
    {author: 'lhx', date: '2019.6.27', title: 'title1', value: 'value1'},
    {author: 'hx1', date: '2019.6.28', title: 'title2', value: 'value2'}
];
let editMode = false;
let blogIndex = 0;

class BlogContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            title: '',
            preview: true,
            blogs: blogs
        }
    }

    onEdit = (blog, index) => {
        editMode = true;
        blogIndex = index;
        this.setState({
            value: blog.value,
            title: blog.title,
            preview: false
        });
    };
    onSave = (value, title) => {
        editMode ? BlogContent.updateBlog(value, title) : BlogContent.addToList(value, title);
        this.setState({
            blogs,
            value,
            title,
            preview: true
        });
    };

    onCreate = ()=>{
        editMode = false;
        this.setState({
            preview: false,
            value: '',
            title: ''
        })
    }
    static updateBlog = (value, title) => {
        blogs[blogIndex].value = value;
        blogs[blogIndex].title = title;
    };

    static addToList(value, title) {
        blogs.push({title: title, value: value, author: 'lhxxx', date: new Date().toLocaleString()});
    }

    componentDidMount() {
        // 声明一个自定义事件
        // 在组件装载完成以后
        this.eventCreateEmitter = emitter.on("create", () => {
            editMode = false;
            this.setState({
                preview: false,
                value: '',
                title: ''
            })
        });
    }

    // 组件销毁前移除事件监听
    componentWillUnmount() {
        emitter.removeListener(this.eventCreateEmitter);
    }

    render() {
        const {preview, value, title, blogs} = this.state;
        return (
            <>
                <Row gutter={16} style={{height:'100%'}}>
                    <Col  span={18} push={6} style={{height:'100%'}}>
                        {!preview ? (<CreateArticle onSave={this.onSave} value={value} title={title}/>) : (
                            <Article value={value} title={title}/>)}
                    </Col>
                    <Col  span={6} pull={18}>
                        <div>
                            <h1>All Blogs</h1>
                            <button onClick={this.onCreate} className="btn btn-primary">Create</button>
                        </div>
                        <BlogList blogs={blogs} onEdit={this.onEdit}/>
                    </Col>
                </Row>
            </>
        )
    }
}

export default BlogContent;