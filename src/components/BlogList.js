/**
 * Created by lihaoxian on 2019/6/27.
 */
import React, {Component} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import BlogItem from './BlogItem';
class BlogList extends Component {
    constructor(props){
        super(props);
        this.state = {
            blogs:this.props.blogs
        }
    }

    removeBlogItem = (index) => {
        this.state.blogs.splice(index, 1);
        this.setState({
            blogs:this.state.blogs
        });
    }
    render(){
        var blogItem = this.state.blogs.map((item,index)=> {
            return <BlogItem key={'blog-' + index}
                             index={index}
                             author={item.author}
                             date={item.date}
                             value={item.value}
                             title={item.title}
                             removeBlogItem={this.removeBlogItem}/>
        });
        return (
            <div>
                {blogItem}
            </div>
        )
    }
}
export default BlogList;