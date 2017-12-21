// You should fork and save if you had updated this CodePend and want to send it to others.
// Note: antd.locales are only support by `dist/antd`
import React from 'react';
import { Form, Modal,Input,Select } from 'antd';
const FormItem = Form.Item;
import { addUsers } from '../../../../axios';
class RegistrationForm extends React.Component {


    checkPassword(rule, value, callback){
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    render() {
        let formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        let tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        let { visible,handleCancel,handleCreate,form } = this.props;
        let { getFieldDecorator } = form;

        let password = form.getFieldValue('password');

        let prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 60 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        let isAdd = form.getFieldValue('isAdd');
        return (
            <Modal
                visible={visible}
                title="编辑系统变量"
                okText="确定"
                onOk={handleCreate}
                onCancel={handleCancel}
            >
                <Form layout="vertical">
                    <FormItem label="名字（key）"  {...formItemLayout}>
                        {isAdd ?
                            getFieldDecorator('keyName', {})(
                                <Input disabled/>
                            ) : getFieldDecorator('keyName', {})(
                            <Input  />
                        )}
                    </FormItem>
                </Form>
                <Form layout="vertical">
                    <FormItem label="值"  {...formItemLayout}>
                        {getFieldDecorator('value', {})(
                            <Input />
                        )}
                    </FormItem>
                </Form>

                <Form layout="vertical">
                    <FormItem label="说明"  {...formItemLayout}>
                        {getFieldDecorator('remark', {})(
                            <Input />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default  Form.create()(RegistrationForm);
