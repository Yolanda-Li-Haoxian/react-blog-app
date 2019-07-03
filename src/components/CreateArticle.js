/**
 * Created by lihaoxian on 2019/6/25.
 */
import React, {Component} from 'react';
// import {Container,Row,Col} from 'react-bootstrap';
import Editor from 'for-editor';

class CreateArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }

    handleChange(value) {
        this.setState({
            value
        })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({value:nextProps.value});
    }

    onSave(value) {
        const title = this.getTitle();

        // let texts = value.replace(/[\n\r]/g, '<br>');
        this.props.onSave(value, title);
    }

    getTitle() {
        const value = this.state.value;
        let title = '';
        let index = value.indexOf(' ');
        if (index > 0) {
            title = value.slice(index + 1)
        }
        return title;
    }

    render() {
        return (
            <Editor value={this.state.value} onChange={this.handleChange.bind(this)} onSave={this.onSave.bind(this)}/>
        )
    }
}

export default CreateArticle;