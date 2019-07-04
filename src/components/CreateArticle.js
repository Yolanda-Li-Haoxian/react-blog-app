/**
 * Created by lihaoxian on 2019/6/25.
 */
import React, {Component} from 'react';
// import {Container,Row,Col} from 'react-bootstrap';
import Editor from 'for-editor';

class CreateArticle extends Component {
    constructor(props) {
        super(props);
        const {value, title} = this.props;
        this.state = {
            value,
            title
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    handleEditorChange(value) {
        this.setState({
            value
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {value, title} = nextProps;
        this.setState({
            value,
            title
        });
    }

    onSave(value) {
        const title = this.state.title ? this.state.title : this.getTitle();

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
        const {title, value} = this.state;
        return (
            <>
                <input type="text" className="form-control title-input" placeholder="Title..." name="title"
                       value={title}
                       onChange={this.handleChange.bind(this)}/>
                <Editor placeholder="Start writing here..." value={value} style={{height:'95%'}}
                        onChange={this.handleEditorChange.bind(this)} onSave={this.onSave.bind(this)}/>
            </>
        )
    }
}

export default CreateArticle;