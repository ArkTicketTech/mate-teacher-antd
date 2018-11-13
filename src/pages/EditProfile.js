import React from 'react';
import api from '../axios';
import { Form, Icon, Input, Button, message, Modal } from 'antd';

const FormItem = Form.Item;
const failMessage = (m) => {
    message.error('failed to ' + m + ', please try again.');
};

class ProfileForm extends React.Component {
    state = {
        updatingPwd: false,
        userInfo: JSON.parse(localStorage.getItem("mateAccountInfo"))
    }

    onEditProfile = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log(err);
                return;
            }
            const data = this.state.userInfo;
            var username = values.username;
            var school = values.school;
            var city = values.city;
            var website = values.website;
            if (!username)
                username = data.name;
            if (!school)
                school = data.school;
            if (!city)
                city = data.city;
            if (!website)
                website = data.website;
            var newData = {
                id: data._id,
                name: username,
                mail: data.mail,
                school: school,
                city: city,
                website: website,
            };
            api.updateUserInfo(newData).then(({
                data
            }) => {
                if (data.success) {
                    this.setState({
                        userInfo: newData
                    });
                    this.props.form.resetFields();
                    // localStorage.setItem("mateToken", data.token);
                } else {
                    failMessage('update user information');
                }
            })
        })
    }

    compareToLastPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassword')) {
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

    showUpdatePwd = () => {
        this.setState({
            updatingPwd: true
        });
    }

    onUpdatePwd = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                api.updatePwd(values).then(({
                    data
                }) => {
                    if (data.success) {
                        console.log(values)
                        message.success('update password success!');
                        this.setState({
                            updatingPwd: false
                        })
                    } else {
                        failMessage('update password');
                    }
                })
            }
        });
    }

    onCancelPwd = () => {
        this.setState({
            updatingPwd: false
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { updatingPwd, userInfo } = this.state;
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
            <Form onSubmit={this.onEditProfile} className="profile-form">
                <FormItem
                    {...formItemLayout}
                    label="姓名">
                    {getFieldDecorator('username')(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder={userInfo ? userInfo.name : '-'} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="职称">
                    {getFieldDecorator('title')(
                        <Input prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder={userInfo ? userInfo.title : '-'} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="学校">
                    {getFieldDecorator('school')(
                        <Input prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder={userInfo ? userInfo.school : '-'} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="学院">
                    {getFieldDecorator('organize')(
                        <Input prefix={<Icon type="audit" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder={userInfo ? userInfo.organize : '-'} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="个人网站">
                    {getFieldDecorator('website')(
                        <Input prefix={<Icon type="cloud" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder={userInfo ? userInfo.website : '-'} />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        提交
                    </Button>
                </FormItem>
                <a className="change-pwd" onClick={this.showUpdatePwd}>修改密码</a>
                </Form>
                <Modal
                    className="change-pwd-modal"
                    visible={updatingPwd}
                    onOk={this.onUpdatePwd}
                    onCancel={this.onCancelPwd}
                >
                    <FormItem
                        {...formItemLayout}
                        label="Password">
                        {getFieldDecorator('oldPassword', {
                            rules: [{
                                required: updatingPwd, message: 'Please input your Password!'
                            }],
                        })(
                            <Input prefix={<Icon type="password" style={{ color: 'rgba(0,0,0,..25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="newPassword">
                        {getFieldDecorator('newPassword', {
                            rules: [{
                                required: updatingPwd, message: 'Please input your new password'
                            }, {
                                validator: this.validateToNextPassword,
                            }]
                        })(
                            <Input prefix={<Icon type="password" style={{ color: 'rgba(0,0,0,..25)' }} />} type="password" placeholder="New Password" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Confirm">
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: updatingPwd, message: 'Please input your Password again!'
                            }, {
                                validator: this.compareToLastPassword,
                            }],
                        })(
                            <Input prefix={<Icon type="password" style={{ color: 'rgba(0,0,0,..25)' }} />} type="password" placeholder="Confirm your password" />
                        )}
                    </FormItem>
                </Modal>
            </div>
        )
    }
}

const EditProfile = Form.create()(ProfileForm);

export default EditProfile;