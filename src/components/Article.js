/**
 * Created by lihaoxian on 2019/6/25.
 */
import React, { Component } from 'react';
import Editor from 'for-editor'

class Article extends Component {
    constructor(props){
        super(props);

    }
   // componentDidMount(){
   //      // 声明一个自定义事件
   //      // 在组件装载完成以后
   //
   //  }
   //  // 组件销毁前移除事件监听
   //  componentWillUnmount(){
   //      // emitter.removeListener(this.eventCreateEmitter);
   //  }

    render() {
        return (
            <Editor preview={true} subfield={false} toolbar value={this.props.value || ''} />
        )
    }
}
export default Article;