import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout} from '../actions/user'
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Card,
    Select,
    Button,
} from 'antd';
import {registerUser} from '../services/httpRequest'
import {getGUID} from "../services/commenSrv";

const {Option} = Select;

const Register = Form.create({name: 'register'})(
    class extends Component {
        constructor(props) {
            super(props);
            this.props.logout();
            this.state = {
                confirmDirty: false,
                autoCompleteResult: [],
            };
        }


        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    values.name = values.nickname;
                    values.id = getGUID();
                    registerUser(values).then(response => {
                        this.props.history.push('/login');
                    })

                }
            });
        };

        handleConfirmBlur = e => {
            const {value} = e.target;
            this.setState({confirmDirty: this.state.confirmDirty || !value});
        };

        compareToFirstPassword = (rule, value, callback) => {
            const {form} = this.props;
            if (value && value !== form.getFieldValue('password')) {
                callback('Two passwords that you enter is inconsistent.');
            } else {
                callback();
            }
        };

        validateToNextPassword = (rule, value, callback) => {
            const {form} = this.props;
            if (value && this.state.confirmDirty) {
                form.validateFields(['confirm'], {force: true});
            }
            callback();
        };

        render() {
            const {getFieldDecorator} = this.props.form;
            const formItemLayout = {
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 8},
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 16},
                },
            };
            const tailFormItemLayout = {
                wrapperCol: {
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 16,
                        offset: 8,
                    },
                },
            };
            const prefixSelector = getFieldDecorator('prefix', {
                initialValue: '86',
            })(
                <Select style={{width: 70}}>
                    <Option value="86">+86</Option>
                    <Option value="87">+87</Option>
                </Select>,
            );
            return (
                <Card title="注册" headStyle={{textAlign: 'center'}} className="register-form">
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="邮箱">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail.',
                                    },
                                    {
                                        required: true,
                                        message: '请输入邮箱地址',
                                    },
                                ],
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="密码" hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入密码',
                                    },
                                    {
                                        validator: this.validateToNextPassword,
                                    },
                                ],
                            })(<Input.Password/>)}
                        </Form.Item>
                        <Form.Item label="确认密码" hasFeedback>
                            {getFieldDecorator('confirm', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请二次输入密码确认',
                                    },
                                    {
                                        validator: this.compareToFirstPassword,
                                    },
                                ],
                            })(<Input.Password onBlur={this.handleConfirmBlur}/>)}
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>
              昵称&nbsp;
                                    <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                            }
                        >
                            {getFieldDecorator('nickname', {
                                rules: [{required: true, message: '请输入用户昵称', whitespace: true}],
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="手机号">
                            {getFieldDecorator('phone', {
                                rules: [{required: true, message: '请输入手机号码'}],
                            })(<Input addonBefore={prefixSelector} style={{width: '100%'}}/>)}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                立即注册
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            );
        }
    }
)


export default connect(null, {logout})(Register);
