import React from 'react';
import logo from '../resources/logo.png';
import { Form, Icon, Input, Button, Checkbox, Modal, Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class LoginForm extends React.Component {
    state = {
        registering: false,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                localStorage.setItem("student_id", values.userName);
                const code = window.location.href.split('/')[5]
                if (code) {
                    window.location.href = '/host/form/' + code;
                }
            }
        });
    }

    showRegister = () => {
        this.setState({
            registering: true
        })
    }

    cancelRegister = () => {
        this.setState({
            registering: false
        })
    }

    register = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                setTimeout(() => {
                    this.setState({ registering: false });
                }, 1000);
            }
        })
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
                        <h1 className="App-title">Welcome to Mate</h1>
                    </header>
                </div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem
                        {...formItemLayout}
                        label="学号">
                        {getFieldDecorator('userName', {
                            rules: [{ required: !registering, message: '请输入你的学号' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="学号" />
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
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>
                        <Button type="primary" onClick={this.showRegister} className="login-form-button">
                            注册
                        </Button>
                    </FormItem>
                </Form>
                <Modal
                    visible={registering}
                    title="注册"
                    onOk={this.register}
                    onCancel={this.cancelRegister}
                    footer={null}
                >
                    <Form onSubmit={this.register} >
                        <FormItem
                            {...formItemLayout}
                            label="学号">
                            {getFieldDecorator('studentCode', {
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
                            label="学校">
                            {getFieldDecorator('university', {
                                rules: [{ required: registering, message: 'Please input your university name!' }],
                            })(
                                <Input prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="学院">
                            {getFieldDecorator('school', {
                                rules: [{ required: registering, message: 'Please input your school name!' }],
                            })(
                                <Input prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="Username" />
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
                            label="性别">
                            {getFieldDecorator('sex', {
                                rules: [{ required: registering, message: 'Please input your sex!' }],
                            })(
                                <RadioGroup>
                                    <Radio value="male">男</Radio>
                                    <Radio value="female">女</Radio>
                                </RadioGroup>
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

const SLoginDialog = Form.create()(LoginForm);

export default SLoginDialog;