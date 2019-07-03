/**
 * Created by lihaoxian on 2019/6/25.
 */
import React, {Component} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import emitter from '../events';
import CreateArticle from './CreateArticle';
import Article from './Article';
import BlogList from './BlogList';
var blogs = [
    {author:'lhx',date:'2019.6.27',title:'title1',value:'value1'},
    {author:'hx1',date:'2019.6.28',title:'title2',value:'value2'}
];
class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            value :null,
            editMode : false,
            blogs:blogs
        }
    }
    onEdit =(blog)=>{
        this.setState({
            value:blog.value,
            editMode:true
        });
    };
    onSave = (value,title)=>{
        Content.addToList(value,title);
        this.setState({
            blogs,
            value,
            editMode:false
        });
    };
    static addToList(value,title){
        blogs.push({title:title, value:value,author:'lhxxx',date:new Date().toLocaleString()});
    }

    componentDidMount(){
        // 声明一个自定义事件
        // 在组件装载完成以后
        this.eventCreateEmitter = emitter.on("create", ()=> {
            this.setState({
                editMode: true,
                value:''
            })
        });
    }
    // 组件销毁前移除事件监听
    componentWillUnmount(){
        emitter.removeListener(this.eventCreateEmitter);
    }
    render(){
        return (
            <Container>
                <Row>
                    <Col sm={8} className="left-pan">
                        { this.state.editMode ? (<CreateArticle onSave={this.onSave} value={this.state.value}/>) : (<Article value={this.state.value}/>) }
                    </Col>
                    <Col sm={4} className="right-pan">
                        <h1>All Blogs</h1>
                        <BlogList blogs={this.state.blogs} onEdit={this.onEdit}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Content;