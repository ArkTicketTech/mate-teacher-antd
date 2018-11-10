import React from 'react';
import api from '../axios';
import logo from '../resources/logo.png';
import { Form, Icon, Input, Button, Modal, Radio } from 'antd';

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
                values.student_id = values.student_ID;
                values.password = values.Password;
                // console.log('Received values of form: ', values);
                api.studentLogin(values).then(({
                    data
                }) => {
                    if (data.success) {
                        localStorage.setItem("mateToken", data.token);
                        localStorage.setItem("mateStudentAccountInfo", JSON.stringify(data.accountInfo));
                        const code = window.location.href.split('/')[5]
                        if (code) {
                            window.location.href = '/host/form/' + code;
                        }
                    }
                })
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
                console.log(values);
                api.studentRegister(values).then(({
                    data
                }) => {
                    if (data.success) {
                        localStorage.setItem("mateToken", data.token);
                        localStorage.setItem("mateStudentAccountInfo", JSON.stringify(data.accountInfo));
                        const code = window.location.href.split('/')[5]
                        if (code) {
                            window.location.href = '/host/form/' + code;
                        }
                    }
                })
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
        localStorage.setItem("formCode", window.location.pathname.split('/')[3]);
        const redirect_uri = 'http://47.88.223.165:8080/oauth/jaccount/student';
        // const redirect_uri = 'http://localhost:3000/oauth/jaccount/student/';
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
                <Form onSubmit={this.handleSubmit} className="student-login-form">
                    <FormItem
                        {...formItemLayout}
                        label="学号">
                        {getFieldDecorator('student_ID', {
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
                        <a className="login-form-jaccount" href={"https://jaccount.sjtu.edu.cn/oauth2/authorize?client_id=Fk2Hgi6HSquH6IaZOBIH&scope=essential&response_type=code&redirect_uri="+redirect_uri}>jaccount</a>
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
                            {getFieldDecorator('student_id', {
                                rules: [{ required: registering, message: 'Please input your student id!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="student id" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="邮件">
                            {getFieldDecorator('mail', {
                                rules: [{
                                    required: registering, message: 'Please input your email address!'
                                }, {
                                    type: 'email', message: 'The input is not valid E-mail',
                                }],
                            })(
                                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="Email address" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="城市">
                            {getFieldDecorator('city', {
                                rules: [{ required: registering, message: 'Please input your university name!' }],
                            })(
                                <Input prefix={<Icon type="copyright" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="City" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="学校">
                            {getFieldDecorator('school', {
                                rules: [{ required: registering, message: 'Please input your school name!' }],
                            })(
                                <Input prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="School" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="学院">
                            {getFieldDecorator('organize', {
                                rules: [{ required: registering, message: 'Please input your organize!' }],
                            })(
                                <Input prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="Organize" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="年级">
                            {getFieldDecorator('grade', {
                                rules: [{ required: registering, message: 'Please input your grade!' }],
                            })(
                                <Input prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="Grade" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="密码">
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: registering, message: 'Please input your Password!'
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
                                    required: registering, message: 'Please input your Password again!'
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,..25)' }} />} type="password" placeholder="Confirm your password" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="性别">
                            {getFieldDecorator('gender', {
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