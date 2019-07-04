/**
 * Created by lihaoxian on 2019/6/25.
 */
import React, {Component} from 'react';
import Editor from 'for-editor'

class Article extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <>
                <input type="text" className="form-control title-input" value={this.props.title || ''} readOnly/>
                <Editor preview={true} subfield={false} toolbar value={this.props.value || ''} style={{height:'95%'}}/>
            </>
        )
    }
}

export default Article;