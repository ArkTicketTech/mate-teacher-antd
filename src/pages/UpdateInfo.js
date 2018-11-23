import React from 'react';
import UpdateStudentInfo from '../components/UpdateStudentInfo';
import UpdateTeacherInfo from '../components/UpdateTeacherInfo';
import { message } from 'antd';

const hintMessage = () => {
    message.success('请补充个人信息');
}

function UpdateInfo(teacher, href) {
    return (
        <div className="update-info">
            {teacher ? renderTeacher(href) : renderStudent(href)}
        </div>
    )
}

function renderTeacher(href) {
    hintMessage();
    return (
        <UpdateTeacherInfo target={href} />
    )
}

function renderStudent(href) {
    hintMessage();
    return (
        <UpdateStudentInfo target={href} />
    )
}

export default UpdateInfo;