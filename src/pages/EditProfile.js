import React from 'react';
import { Form, Icon, Input, Button, Modal } from 'antd';
import ProfileData from '../api/Profile';

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
            var country = values.country;
            var website = values.website;
            var signature = values.signature;
            if (!username)
                username = data.username;
            if (!school)
                school = data.school;
            if (!city)
                city = data.city;
            if (!country)
                country = data.country;
            if (!website)
                website = data.website;
            if (!signature)
                signature = data.signature;
            var newData = {
                username: username,
                school: school,
                city: city,
                country: country,
                website: website,
                signature: signature
            };
            this.setState({
                data: newData
            });
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
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder={this.state.data.school} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="City">
                    {getFieldDecorator('city')(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder={this.state.data.city} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Country">
                    {getFieldDecorator('country')(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder={this.state.data.country} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="website">
                    {getFieldDecorator('website')(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder={this.state.data.website} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="personalized signature">
                    {getFieldDecorator('signature')(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder={this.state.data.signature} />
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