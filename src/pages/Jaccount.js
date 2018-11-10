import React from 'react';
import api from '../axios';
import queryString from 'query-string';
import { message } from 'antd';

class LoginJc extends React.Component {
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
                if (data.success) {
                    localStorage.setItem("mateToken", data.token);
                    localStorage.setItem("mateAccountInfo", JSON.stringify(data.accountInfo));
                    window.location.href = '/main';
                } else {
                    message.error("failed to login")
                }
            })
        } else if (user === 'student') {
            api.studentLoginByJaccount(data).then(({
                data
            }) => {
                if (data.success) {
                    localStorage.setItem("mateToken", data.token);
                    localStorage.setItem("mateStudentAccountInfo", JSON.stringify(data.accountInfo));
                    const form_code = localStorage.getItem("formCode")
                    if (form_code) {
                        window.location.href = '/host/form/' + form_code;
                    } else {
                        console.log(this.props)
                    }
                } else {
                    message.error("failed to login")
                }
                console.log(data)
            })
        }
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default LoginJc