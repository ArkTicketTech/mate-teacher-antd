import React from 'react';
import api from '../axios';
import { Form, Icon, Input, Button } from 'antd';
import ProfileData from '../api/ProfileData';

const FormItem = Form.Item;

class ProfileForm extends React.Component {
    state = {
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
            var mail = values.mail;
            var website = values.website;
            if (!username)
                username = data.username;
            if (!school)
                school = data.school;
            if (!city)
                city = data.city;
            if (!website)
                website = data.website;
            if (!mail)
                mail = data.mail;
            var newData = {
                id: data.id,
                name: username,
                school: school,
                city: city,
                website: website,
                mail: mail,
            };
            api.UpdateUserInfo(newData);
            window.location.href = '/main/Profile';
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
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
                    label="mail">
                    {getFieldDecorator('mail')(
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder={this.state.data.mail} />
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
            </Form>
        )
    }
}

const EditProfile = Form.create()(ProfileForm);

export default EditProfile;