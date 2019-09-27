import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Form, Icon, Input, Button, Checkbox, Spin, Card} from 'antd';
import {connect} from 'react-redux';
import {login} from '../actions/user'

const mapStateToProps = (state) => ({
    isLoading: state.user.isLoading,
});
const Login = Form.create({name: 'normal_login'})(
    class extends Component {
        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    this.props.login(values);
                }
            });
        };

        render() {
            const {getFieldDecorator} = this.props.form;
            return (
                <>
                    <h1 style={{textAlign: 'center',position: 'relative',top: '20%'}}>欢迎来到Easy博客</h1>
                    <Card title="登录" headStyle={{textAlign: 'center'}} className="login-form">
                        <Spin tip="Loading..." spinning={this.props.isLoading}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Item>
                                    {getFieldDecorator('username', {
                                        rules: [{required: true, message: '请输入用户名'}],
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            placeholder="用户名"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: '请输入密码'}],
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            type="password"
                                            placeholder="密码"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(<Checkbox>下次自动登录</Checkbox>)}
                                    <a className="login-form-forgot" href='/'>
                                        忘记密码
                                    </a>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        立即登录
                                    </Button>
                                    Or <Link to="/register">注册</Link>
                                </Form.Item>
                            </Form>
                        </Spin>
                    </Card>
                </>

            );
        }
    }
)

export default connect(mapStateToProps, {login})(Login);
