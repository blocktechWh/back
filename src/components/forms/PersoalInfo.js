// You should fork and save if you had updated this CodePend and want to send it to others.
// Note: antd.locales are only support by `dist/antd`
import React from 'react';
import { Form, Modal,Input,Select } from 'antd';
const FormItem = Form.Item;
class RegistrationForm extends React.Component {


    state = {
        confirmDirty: false
    };

    checkPassword(rule, value, callback){
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('确认密码和密码不相同!');
        } else {
            callback();
        }
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
        let that=this;
        let isAdd = form.getFieldValue('isAdd');
        return (
            <Modal
                visible={visible}
                title="编辑用户"
                okText="确定"
                onOk={handleCreate}
                onCancel={handleCancel}
            >
                <Form layout="vertical">
                    <FormItem label="原密码"  {...formItemLayout}>
                        {getFieldDecorator('oldPassword', {})(
                            <Input type="password"/>
                        )}
                    </FormItem>
                    <FormItem label="密码"  {...formItemLayout}>
                        {getFieldDecorator('newPassword', {
                            rules: [{validator: that.checkConfirm.bind(that)},{required: true, message: '请输入新密码!'}],
                        })(
                            <Input type="password"/>
                        )}
                    </FormItem>
                    <FormItem label="确认密码"  {...formItemLayout}>
                        {getFieldDecorator('confirm', {
                            rules: [{validator: that.checkPassword.bind(that)},{required: true, message: '请输入确认密码!'}],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default  Form.create()(RegistrationForm);
