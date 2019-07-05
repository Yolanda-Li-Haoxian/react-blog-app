import React, {Component} from 'react';
import {Modal, Form, Input} from 'antd';

const AddFileModal = Form.create({name: 'form_in_modal'})(
    class extends Component {
        render() {
            const {visible, modalType, handleCancel, handleOk, form} = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal title={modalType === 1 ? "Create a new Folder" : "Create a new File"}
                       visible={visible}
                       onOk={handleOk}
                       onCancel={handleCancel}>
                    <Form>
                        <Form.Item label={modalType === 1 ? "Name:" : "Title:"}>
                            {getFieldDecorator('title', {
                                rules: [{required: true, message: 'The filed is required.'}],
                            })(<Input/>)}
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
    }
);
export default AddFileModal;