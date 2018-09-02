import React from 'react';
import { Table } from 'antd';

class CoursesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [{
                key: '1',
                name: '数据结构与算法',
                season: '2017秋',
                members: '55',
                site: '东中院4-101'
            }, {
                key: '2',
                name: '数学的天空',
                season: '2017夏',
                members: '27',
                site: '中院107'
            }, {
                key: '2',
                name: '高性能计算',
                season: '2018春',
                members: '18',
                site: '东上院507'
            }],
            columns: [{
                title: '课程名称',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '上课时间',
                dataIndex: 'season',
                key: 'season'
            }, {
                title: '上课人数',
                dataIndex: 'members',
                key: 'members'
            }, {
                title: '上课地点',
                dataIndex: 'site',
                key: 'site'
            }]
        }
    }

    render() {
        return (
            <Table dataSource={this.state.courses} columns={this.state.columns} />
        )
    }
}

export default CoursesList;
