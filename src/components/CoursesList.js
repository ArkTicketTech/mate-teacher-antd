import React from 'react';
import { Table, Divider, Button } from 'antd';

class CoursesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testArray: [1, 2],
            selectedRowKeys: [],
            courses: [{
                key: 0,
                name: '数据结构与算法',
                season: '2017秋',
                members: '55',
                site: '东中院4-101',
                removed: false
            }, {
                key: 1,
                name: '数学的天空',
                season: '2017夏',
                members: '27',
                site: '中院107',
                removed: false
            }, {
                key: 2,
                name: '高性能计算',
                season: '2018春',
                members: '18',
                site: '东上院507',
                removed: false
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
            }, {
                title: '操作',
                key: 'action',
                render: () => (
                    <span>
                        <a href="javascript::">问卷状态</a>
                        <Divider type="vertical" />
                        <a href="javascript::">生成报告</a>
                    </span>
                )
            }],
        }
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('seletedRowKeys changed: ', selectedRowKeys);
        // console.log('test array output: ', this.state.testArray);
        // var index;
        // for (index in this.state.testArray) {
            // console.log(Number(index), typeof Number(index));
        // }
        this.setState({ selectedRowKeys });
    }

    remove = () => {
        var newCourses = this.state.courses;
        console.log('seletedRowKeys changed: ', this.state.selectedRowKeys);
        console.log('Courses changed: ', this.state.courses);
        var i = this.state.selectedRowKeys.length;
        // var i = this.state.testArray.length;
        // for (index in this.state.selectedRowKeys) {
        // for (item in this.state.testArray) {
        while (i--) {
            console.log(this.state.selectedRowKeys[i]);
            // newCourses[this.state.testArray[i]].removed = true;
            newCourses[this.state.selectedRowKeys[i]].removed = true;
        }
        this.setState({ selectedRowKeys: [], Courses: newCourses });
    }

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        return (
            <div>
                <span>
                    <Button type="primary"
                        style={{ margin: '5px 5px'}}
                        onClick={this.add}>
                        添加课程
                    </Button>
                    <Button type="primary"
                        style={{ margin: '5px 5px' }}
                        disabled={!hasSelected}
                        onClick={this.remove}>
                        移除课程
                    </Button>
                    <Button type="primary"
                        style={{ margin: '5px 5px'}}
                        disabled={!hasSelected}
                        onClick={this.edit}>
                        编辑课程
                    </Button>
                </span>
                <Table rowSelection={rowSelection} dataSource={this.state.courses} columns={this.state.columns} />
            </div>
        )
    }
}

export default CoursesList;
