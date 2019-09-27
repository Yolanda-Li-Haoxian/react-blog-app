import React, {Component} from 'react';

import {Link} from 'react-router-dom';
import moment from 'moment';
import CONST_JSON from '../define_const_json';
import '../styles/App.css';
import MainHeader from './MainHeader';
import {Layout, List, Descriptions, Icon} from 'antd';

import {getBlogArticles} from '../services/httpRequest';



const {Content, Footer} = Layout;

const IconText = ({type, text}) => (
    <span>
        <Icon type={type} style={{marginRight: 8}}/>
        {text}
    </span>
);

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleList: [],
            loading:true
        };
    }
    componentWillMount() {
        console.log('componentWillMount','props:'+this.props,'state:'+this.state)
    }
    componentDidMount() {
        console.log('componentDidMount','props:'+this.props,'state:'+this.state);
        getBlogArticles().then(response => {
            this.setState({articleList: response,loading:false});
        });
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('componentWillReceiveProps','nextProps:'+nextProps,'nextContext:'+nextContext);
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate','nextProps:'+nextProps,'nextState:'+nextState,'nextContext:'+nextContext);
        return true;
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('componentWillUpdate','nextProps:'+nextProps,'nextState:'+nextState,'nextContext:'+nextContext);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate','prevProps:'+prevProps,'prevState:'+prevState,'snapshot:'+snapshot);
    }


    render() {
        console.log('render');
        const {articleList,loading} = this.state;
        return (
            <Layout style={{height: '100%'}}>
                <MainHeader/>
                <Content style={{padding: '0 50px', height: '100%', overflowY: 'auto'}}>
                    <List dataSource={articleList} itemLayout='vertical' loading={loading}
                          renderItem={item => (
                              <List.Item key={item.id} actions={[
                                  <IconText type="star-o" text={item.favorites}/>,
                                  <IconText type="like-o" text={item.likes}/>,
                                  <IconText type="message" text={item.commentsCount}/>,
                              ]}>
                                  <List.Item.Meta
                                      title={<Link to={{
                                          pathname: '/articleDetails',
                                          search: JSON.stringify(item),
                                          state: {article: item}
                                      }}
                                                   target='_blank'>{item.title}</Link>}
                                      description={
                                          <Descriptions>
                                              <Descriptions.Item
                                                  label="创建者">{item.author}</Descriptions.Item>
                                              <Descriptions.Item
                                                  label="创建时间">{moment(item.createAt).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
                                              <Descriptions.Item
                                                  label="上次更新时间">{moment(item.lastUpdate).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
                                          </Descriptions>
                                      }/>
                              </List.Item>
                          )}
                    />
                </Content>
                <Footer style={{textAlign: 'center'}}>{CONST_JSON.FOOTER_WORDING}</Footer>
            </Layout>
        );
    }
}

export default Home;


