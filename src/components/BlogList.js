/**
 * Created by lihaoxian on 2019/6/27.
 */
import React, {Component} from 'react';
import BlogItem from './BlogItem';
class BlogList extends Component {
    constructor(props){
        super(props);
        const blogs = this.props.blogs;
        this.state = {
            blogs: blogs
        }
    }

    onRemove (index) {
        const newBlogs = this.state.blogs.slice();
        newBlogs.splice(index, 1);
        this.setState({
            blogs: newBlogs
        });
    }
    onEdit (blog){
        this.props.onEdit(blog);
    }


    render() {
        let blogItem = this.state.blogs.map((item, index) => {
            return <BlogItem key={'blog-' + index} onRemove={this.onRemove.bind(this,index)} onEdit={this.onEdit.bind(this,item)}>{item}</BlogItem>
        });
        return (
            <>
                {blogItem}
            </>
        )
    }


}

export default BlogList;

