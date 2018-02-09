// You should fork and save if you had updated this CodePend and want to send it to others.
// Note: antd.locales are only support by `dist/antd`
import React from 'react';
import { Form, Modal,Input,Select } from 'antd';
const FormItem = Form.Item;
import { addUsers } from '../../../../axios';
class RegistrationForm extends React.Component {

    state = {
        confirmDirty: false
    };
    checkPassword(rule, value, callback){
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
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

    componentWillReceiveProps(nextProps){

     }



    handleSubmit = (e) => {
        e.preventDefault();
        let that=this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                that.props.handleCreate();
                console.log('Received values of form: ', values);
            }
        });
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

        let { visible,handleCancel,form,isAdd } = this.props;
        let { getFieldDecorator } = form;
        let prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 60 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        let that=this;


        return (
            <Modal
                visible={visible}
                title="编辑用户"
                okText="确定"
                onOk={this.handleSubmit}
                onCancel={handleCancel}
            >
                <Form layout="vertical">
                    <FormItem label="用户名"  {...formItemLayout}>
                        {isAdd ?
                            getFieldDecorator('username', {
                                rules: [{required: true, message: '用户名不能为空!'}],
                            })(
                                <Input />
                            ) : getFieldDecorator('username', {})(
                            <Input disabled />
                        )}
                    </FormItem>

                    <FormItem label="昵称"  {...formItemLayout} >
                        {getFieldDecorator('nickname', {})(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem label="手机号"  {...formItemLayout} >
                        {getFieldDecorator('phone', {
                            rules: [{required: true, message: '请输入手机号!'}],
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }}/>
                        )}
                    </FormItem>

                    <FormItem label="邮件"  {...formItemLayout} hasFeedback>
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: '请输入正确的邮件!',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem label="密码"  {...formItemLayout} hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [{validator: that.checkConfirm.bind(that)},{required: isAdd, message: '请输入密码!'}],
                        })(
                            <Input type="password"/>
                        )}
                    </FormItem>

                    <FormItem label="确认密码"  {...formItemLayout} hasFeedback>
                        {getFieldDecorator('confirm', {

                            rules: [{validator: that.checkPassword.bind(that)},{required: isAdd, message: '请输入确认密码!'}],
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
