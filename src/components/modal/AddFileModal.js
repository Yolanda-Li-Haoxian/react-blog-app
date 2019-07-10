import React, {Component} from 'react';
import {Modal, Form, Input} from 'antd';

const AddFileModal = Form.create({name: 'form_in_modal'})(
    class extends Component {
        render() {
            const {visible, handleCancel, handleOk, form,modalType, editNode} = this.props;
            const {getFieldDecorator} = form;
            const initialValue = modalType === 3 ? editNode.title :'';
            return (
                <Modal
                    title={modalType === 1 ? "Create a new Folder" : (modalType === 2 ? "Create a new File" : "Rename Folder")}
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}>
                    <Form>
                        <Form.Item label={(modalType === 1 || modalType === 3) ? "Name:" : "Title:"}>
                            {getFieldDecorator('title', {
                                rules: [{required: true, message: 'The filed is required.'}],
                                initialValue:initialValue
                            })(<Input/>)}
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
    }
);
export default AddFileModal;