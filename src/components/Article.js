/**
 * Created by lihaoxian on 2019/6/25.
 */
import React, {Component} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import $ from 'jquery';


class Article extends Component {
    constructor(props){
        super(props);
        // this.state = {
        //     value :null
        // }
    }

    componentDidMount(){
        // 声明一个自定义事件
        // 在组件装载完成以后
        $('.left-container').html(this.props.value);
    }
    // 组件销毁前移除事件监听
    // componentWillUnmount(){
    //     emitter.removeListener(this.eventEmitter);
    // }
    render(){
        return (
            <div className="left-container"></div>
        )
    }
}
export default Article;