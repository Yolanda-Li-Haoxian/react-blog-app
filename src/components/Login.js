import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Form, Icon, Input, Button, Checkbox, Spin} from 'antd';
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
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Spin tip="Loading..." spinning={this.props.isLoading}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: 'Please input your username.'}],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password.'}],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <Link to="/register">register now</Link>
                        </Form.Item>
                    </Spin>
                </Form>

            );
        }
    }
)

export default connect(mapStateToProps, {login})(Login);