import React from 'react';
import api from '../axios';
import logo from '../resources/logo.png';
import { Form, Icon, Input, Button, Modal, message, Radio, InputNumber } from 'antd';

const RadioGroup = Radio.Group;

const FormItem = Form.Item;
const failedRegister = () => {
    message.error('注册失败，请检查注册表单。');
};
const failedLogin = () => {
    message.error('登陆失败，请检查用户名和密码是否正确.');
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
                        console.log(data)
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
                    // console.log(data);
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
            callback('两次输入的密码不相同！');
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
        const redirect_uri = 'http://47.88.223.165:8080/oauth/jaccount/teacher';
        // const redirect_uri = 'http://localhost:3000/oauth/jaccount/teacher';
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
                    <h1 className="App-title">欢迎使用 Mate</h1>
                </div>
                <Form onSubmit={this.onLogin} className="login-form">
                    <FormItem
                        {...formItemLayout}
                        label="邮箱">
                        {getFieldDecorator('Email', {
                            rules: [{ required: !registering, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="Email" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码">
                        {getFieldDecorator('Password', {
                            rules: [{ required: !registering, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,..25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        <a className="login-form-jaccount" href={"https://jaccount.sjtu.edu.cn/oauth2/authorize?client_id=Fk2Hgi6HSquH6IaZOBIH&scope=essential&response_type=code&redirect_uri="+redirect_uri}>jaccount 登陆</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>
                        <a onClick={this.onRegister}>现在注册</a>
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
                            label="邮箱">
                            {getFieldDecorator('mail', {
                                rules: [{
                                    required: registering, message: '请输入你的邮箱!'
                                }, {
                                    type: 'email', message: '不是有效的邮箱地址',
                                }],
                            })(
                                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="Email address" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="姓名">
                            {getFieldDecorator('name', {
                                rules: [{ required: registering, message: '请输入你的姓名' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="Name" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="密码">
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: registering, message: '请输入你的密码!'
                                }, {
                                    validator: this.validateToNextPassword,
                                }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,..25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="确认密码">
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: registering, message: '请再次输入你的密码!'
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,..25)' }} />} type="password" placeholder="Confirm your password" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="学校">
                            {getFieldDecorator('school', {
                                rules: [{ required: registering, message: '请输入你的学校的正式名称!' }]
                            })(
                                <Input prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="your school" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="职称">
                            {getFieldDecorator('title', {
                                rules: [{ required: registering, message: '请输入你的职称!' }]
                            })(
                                <Input prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="your title" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="学院">
                            {getFieldDecorator('organize', {
                                rules: [{ required: registering, message: '请输入你的学院的正式名称!' }]
                            })(
                                <Input prefix={<Icon type="read" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="your organization" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="年龄">
                            {getFieldDecorator('age', {
                                rules: [{ required: registering, message: '请输入你的年龄!' }]
                            })(
                                <InputNumber />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="性别">
                            {getFieldDecorator('gender', {
                                rules: [{ required: registering, message: '请选择你的性别!' }]
                            })(
                                <RadioGroup>
                                    <Radio value="male">男性</Radio>
                                    <Radio value="female">女性</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="国家">
                            {getFieldDecorator('country')(
                                <Input prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="your country" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="个人网站">
                            {getFieldDecorator('website')(
                                <Input prefix={<Icon type="cloud" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="your website" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                注册
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