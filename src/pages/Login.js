import React from 'react';
import api from '../axios';
import logo from '../resources/logo.png';
import { Form, Icon, Input, Button, Modal, message } from 'antd';

const FormItem = Form.Item;
const failedRegister = () => {
    message.error('failed to register, please try again.');
};
const failedLogin = () => {
    message.error('failed to login, please check your password.');
};

class LoginForm extends React.Component {
    state = {
        registering: false,
    }

    onLogin = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const mail = values.Email;
                const psw = values.Password;
                // console.log('Received values of form: ', values);
                const userData = {
                    "mail": mail,
                    "password": psw
                };
                api.userLogin(userData).then(({
                    data
                }) => {
                    if (data.success) {
                        localStorage.setItem("mateToken", data.token);
                        localStorage.setItem("mateAccountInfo", JSON.stringify(data.accountInfo));
                        window.location.href = '/main/CoursesList';
                    } else {
                        // console.log(data)
                        failedLogin();
                    }
                })
            }
        });
    }

    onRegister = () => {
        this.setState({
            registering: true,
        });
    }

    handleOk = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                api.userRegister(values).then(({
                    data
                }) => {
                    console.log(data);
                    if (data.success) {
                        // console.log(values);
                        setTimeout(() => {
                            this.setState({ registering: false });
                        }, 1000);
                        localStorage.setItem("mateToken", data.token);
                        localStorage.setItem("mateAccountInfo", JSON.stringify(data.accountInfo));
                        window.location.href = '/main/CoursesList';
                    } else {
                        failedRegister();
                    }
                })
                // console.log('Received values of form: ', values);
            }
        });
    }

    handleCancel = () => {
        this.setState({ registering: false });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { registering } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 16 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 16 },
                sm: { span: 16 },
            },
        };
        return (
            <div>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                    </header>
                    <h1 className="App-title">Welcome to Mate</h1>
                </div>
                <Form onSubmit={this.onLogin} className="login-form">
                    <FormItem
                        {...formItemLayout}
                        label="Email">
                        {getFieldDecorator('Email', {
                            rules: [{ required: !registering, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="Email" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Password">
                        {getFieldDecorator('Password', {
                            rules: [{ required: !registering, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,..25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        <a className="login-form-jaccount" href="/main/CourseList">jaccount</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Login
                        </Button>
                        Or <a onClick={this.onRegister}>register now!</a>
                    </FormItem>
                </Form>
                <Modal
                    visible={registering}
                    title="Register"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form onSubmit={this.handleOk} >
                        <FormItem
                            {...formItemLayout}
                            label="E-mail">
                            {getFieldDecorator('mail', {
                                rules: [{
                                    required: registering, message: 'Please input your email address!'
                                }, {
                                    type: 'email', message: 'The input is not valid E-mail',
                                }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="Email address" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Username">
                            {getFieldDecorator('name', {
                                rules: [{ required: registering, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Password">
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: registering, message: 'Please input your Password!'
                                }, {
                                    validator: this.validateToNextPassword,
                                }],
                            })(
                                <Input prefix={<Icon type="password" style={{ color: 'rgba(0,0,0,..25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Confirm">
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: registering, message: 'Please input your Password again!'
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input prefix={<Icon type="password" style={{ color: 'rgba(0,0,0,..25)' }} />} type="password" placeholder="Confirm your password" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="School">
                            {getFieldDecorator('school')(
                                <Input prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="your school" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Country">
                            {getFieldDecorator('country')(
                                <Input prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="your country" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Website">
                            {getFieldDecorator('website')(
                                <Input prefix={<Icon type="cloud" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="your website" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Register
                            </Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const LoginDialog = Form.create()(LoginForm);

export default LoginDialog;