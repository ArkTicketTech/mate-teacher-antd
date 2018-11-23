import React from 'react';
import { Form, message, Input, Icon, Radio, Button } from 'antd';
import api from '../axios';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class UpdateInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                api.updateStudentInfo(values).then(({
                    data
                }) => {
                    if (data.success) {
                        window.location.href = this.props.target;
                    } else {
                        message.error("个人信息更新失败");
                    }
                })
            }
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
            <Form onSubmit={this.submit} >
                        <FormItem
                            {...formItemLayout}
                            label="邮件">
                            {getFieldDecorator('mail', {
                                rules: [{
                                    required: true, message: 'Please input your email address!'
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
                                rules: [{ required: true, message: 'Please input your university name!' }],
                            })(
                                <Input prefix={<Icon type="copyright" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="City" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="年级">
                            {getFieldDecorator('grade', {
                                rules: [{ required: true, message: 'Please input your grade!' }],
                            })(
                                <Input prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="Grade" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="性别">
                            {getFieldDecorator('gender', {
                                rules: [{ required: true, message: 'Please input your sex!' }],
                            })(
                                <RadioGroup>
                                    <Radio value="male">男</Radio>
                                    <Radio value="female">女</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            更新
                        </Button>
                    </FormItem>
            </Form>
        )
    }
}

const UpdateStudentInfo = Form.create()(UpdateInfo);

export default UpdateStudentInfo;