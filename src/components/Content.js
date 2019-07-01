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
    {author:'lhx',date:'2019.6.27',title:'gggggggg'},
    {author:'hx1',date:'2019.6.28',title:'nnnnnnnn'}
]
class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            value :null,
            showCreate : false,
            blogs:blogs
        }
    }
    updateArticle = (value,title)=>{
        blogs.push({title:title, value:value,author:'lhxxx',date:new Date().toLocaleString()});
        this.setState({
            blogs,
            value,
            showCreate:false
        });
    }

    componentDidMount(){
        // 声明一个自定义事件
        // 在组件装载完成以后
        this.eventCreateEmitter = emitter.addListener("create", (msg)=> {
            this.setState({
                showCreate: true,
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
                        { this.state.showCreate ? <CreateArticle updateArticle={this.updateArticle}/> : <Article value={this.state.value}/> }
                    </Col>
                    <Col sm={4} className="right-pan">
                        <h1>All Blogs</h1>
                        <BlogList blogs={this.state.blogs}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Content;