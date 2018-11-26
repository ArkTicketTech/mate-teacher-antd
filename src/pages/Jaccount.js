import React from 'react';
import api from '../axios';
import queryString from 'query-string';
import UpdateInfo from './UpdateInfo';
import { message } from 'antd';

class LoginJc extends React.Component {
    state = {
        update: false,
        target: '/main/CoursesList',
        teacher: true,
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        const user = window.location.href.split('/')[5].split('?')[0];
        const data = {
            code: values.code
        };
        if (user === 'teacher') {
            api.userLoginByJaccount(data).then(({
                data
            }) => {
                console.log(data)
                localStorage.setItem("mateToken", data.token);
                localStorage.setItem("mateAccountInfo", JSON.stringify(data.accountInfo));
                if (data.success) {
                    if (data.accountInfo.gender) {
                        window.location.href = '/main/CoursesList';
                    } else {
                        this.setState({ update: true });
                    }
                } else {
                    message.error("登陆失败")
                }
            })
        } else if (user === 'student') {
            api.studentLoginByJaccount(data).then(({
                data
            }) => {
                if (data.success) {
                    const form_code = localStorage.getItem("formCode");
                    const href = '/host/form/' + form_code;
                    localStorage.setItem("mateToken", data.token);
                    localStorage.setItem("mateStudentAccountInfo", JSON.stringify(data.accountInfo));
                    if (data.accountInfo.gender) {
                        if (form_code) {
                            window.location.href = href;
                        } else {
                            console.log(this.props)
                        }
                    } else {
                        this.setState({ update: true, teacher: false, target: href });
                    }

                } else {
                    message.error("登陆失败")
                }
                console.log(data)
            })
        }
    }

    render() {
        const { update, target, teacher } = this.state;
        return (
            <div>
                {update ? UpdateInfo(teacher, target) : null}
            </div>
        )
    }
}

export default LoginJc