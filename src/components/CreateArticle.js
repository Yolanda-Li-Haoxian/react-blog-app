/**
 * Created by lihaoxian on 2019/6/25.
 */
import React, {Component} from 'react';
import emitter from '../events';
// import {Container,Row,Col} from 'react-bootstrap';
import Editor from 'for-editor';
class CreateArticle extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:'',
            value :''
        }
    }
    handleChange(value) {
        this.setState({
            value
        })
    }
    onSave(){
        const value = this.state.value;
        let title = '';
        let index = value.indexOf('\n');
        if (index > 0) {
            title = value.slice(0, index)
        }
        let texts= value.replace(/[\n\r]/g,'<br>');
        return this.props.updateArticle(texts, title);
    }
    render(){
        const {value } = this.state;
        return (
            <Editor value={value} onChange={this.handleChange.bind(this)} onSave={this.onSave.bind(this)}/>
        )
    }
}
export default CreateArticle;