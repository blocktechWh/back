import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;
import { Link } from 'react-router';
import axios from 'axios';
import { login } from '../../axios';

class Login extends React.Component {
    
    componentWillMount(){
        this.props.showFooter();
    }

    handleSubmit = (e) => {
        this.setState({  loading: true});
        e.preventDefault();
        const redirect = (res)=>{
            localStorage.setItem('token',res.data);
            axios.defaults.headers.common['Authorization'] = res.data;
            this.props.router.push('/nav/adminuser');
        }

        this.props.form.validateFields((err, values) => {
            if (!err) {
                login(values.userName, values.password).then( res => {
                    if(res.code==='000'){
                        redirect(res);
                    }else{
                        message.error(res.msg);
                    }
                    this.setState({  loading: false});
                });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="login" style={{textAlign:'center', marginTop:'100px'}}>
                <div className="login-form" >
                    <div className="login-logo">
                        <span>管理后台</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{ margin:'0 auto',maxWidth: '300px' }}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required : true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox style={{float: 'left'}}>记住我</Checkbox>
                            )}
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create()(Login);