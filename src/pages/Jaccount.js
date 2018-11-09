import React from 'react';
import api from '../axios';
import queryString from 'query-string';

class LoginJc extends React.Component {
    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        const user = window.location.href.split('/')[5].split('?')[0];
        const data = {
            code: values.code
        };
        if (user === 'teacher') {
            console.log(data)
            api.userLoginByJaccount(data).then(({
                data
            }) => {
                console.log(data)
            })
        } else if (user === 'student') {
            api.studentLoginByJaccount(data).then(({
                data
            }) => {
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