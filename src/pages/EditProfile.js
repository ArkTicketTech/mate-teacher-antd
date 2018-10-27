import React from 'react';
import api from '../axios';
import { Form, Icon, Input, Button, message, Modal } from 'antd';
import ProfileData from '../api/ProfileData';

const FormItem = Form.Item;
const failMessage = (m) => {
    message.error('failed to ' + m + ', please try again.');
};

class ProfileForm extends React.Component {
    state = {
        updatingPwd: false,
        data: ProfileData
    }

    onEditProfile = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log(err);
                return;
            }
            const data = this.state.data;
            var username = values.username;
            var school = values.school;
            var city = values.city;
            var website = values.website;
            if (!username)
                username = data.username;
            if (!school)
                school = data.school;
            if (!city)
                city = data.city;
            if (!website)
                website = data.website;
            var newData = {
                id: data.id,
                name: username,
                school: school,
                city: city,
                website: website,
            };
            api.updateUserInfo(newData).then(({
                data
            }) => {
                if (data.success) {
                    localStorage.setItem("token", data.token);
                    window.location.href = '/main/Profile';
                } else {
                    failMessage('update user information');
                }
            })
        })
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
        const { updatingPwd } = this.state;
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
                    label="Username">
                    {getFieldDecorator('userName')(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder={this.state.data.username} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="School">
                    {getFieldDecorator('school')(
                        <Input prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder={this.state.data.school} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="City">
                    {getFieldDecorator('city')(
                        <Input prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder={this.state.data.city} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="website">
                    {getFieldDecorator('website')(
                        <Input prefix={<Icon type="cloud" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder={this.state.data.website} />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Submit
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
                        {getFieldDecorator('newPassword', {
                            rules: [{
                                required: updatingPwd, message: 'Please input your Password again!'
                            }, {
                                validator: this.compareToFirstPassword,
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