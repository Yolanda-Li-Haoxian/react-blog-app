import React, {Component} from 'react';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';

const {Option} = Select;
const Register = Form.create({name: 'register'})(
    class extends Component {
        state = {
            confirmDirty: false,
            autoCompleteResult: [],
        };

        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    this.props.history.push('/login');
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
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className='register-form'>
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail.',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail.',
                                },
                            ],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password.',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password/>)}
                    </Form.Item>
                    <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password.',
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
              Nickname&nbsp;
                                <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                        }
                    >
                        {getFieldDecorator('nickname', {
                            rules: [{required: true, message: 'Please input your nickname.', whitespace: true}],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="Phone Number">
                        {getFieldDecorator('phone', {
                            rules: [{required: true, message: 'Please input your phone number.'}],
                        })(<Input addonBefore={prefixSelector} style={{width: '100%'}}/>)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            );
        }
    }
)


export default Register;