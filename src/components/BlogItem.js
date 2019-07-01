/**
 * Created by lihaoxian on 2019/6/27.
 */
import React, {Component} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import '../styles/blog-item.css';
class BlogItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:''
        }
    }
    onRemove(index){
        return this.props.removeBlogItem(index);
    }
    render(){
        return (
            <div className="blog-item">
                <div>
                    <h5>{this.props.title}</h5>
                    <div>
                        <span>{this.props.author}</span>
                        <span className="item-date">{this.props.date}</span>
                    </div>
                </div>
                <a className="close close-icon" onClick={this.onRemove.bind(this,this.props.index)}>&times;</a>
            </div>
        )
    }
}
export default BlogItem;