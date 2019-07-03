/**
 * Created by lihaoxian on 2019/6/27.
 */
import React, {Component} from 'react';
import '../styles/blog-item.css';
class BlogItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:''
        }
    }

    render(){
        const {title,author,date}=this.props.children;
        return (
            <div className="blog-item">
                <div className="item-div" onClick={this.props.onEdit}>
                    <h5>{title}</h5>
                    <div>
                        <span>{author}</span>
                        <span className="item-date">{date}</span>
                    </div>
                </div>
                <a className="close close-icon" onClick={this.props.onRemove}>&times;</a>
            </div>
        )
    }
}
export default BlogItem;