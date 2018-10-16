import React from 'react';
import api from '../axios';
import { Table, Button, Form } from 'antd';
import QuizStatus from './QuizStatus';
import EditableFormCell from './EditableCell';

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class CoursesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            courses: [],
            count: 15, //课程总数
            quizStatusOn: true,
        };

        for (let i = 0; i < 15; i++) {
            this.state.courses.push({
                key: i,
                course_id: '5bc2bb2539167622a39bcf64',
                teacher_id: this.props.teacher_id,
                title: '示例课程' + i,
                begin_time: '2018-09-09',
                end_time: '2018-10-09',
                student_num: 30 + i,
                location: '东上院507',
                removed: false,
            });
        }

        this.columns = [{
            title: '课程名称',
            dataIndex: 'title',
            editable: true,
            key: 'title'
        }, {
            title: '开始时间',
            dataIndex: 'begin_time',
            editable: true,
            key: 'begin_time'
        }, {
            title: '结束时间',
            dataIndex: 'end_time',
            editable: true,
            key: 'end_time'
        }, {
            title: '上课人数',
            dataIndex: 'student_num',
            editable: true,
            key: 'student_num'
        }, {
            title: '上课地点',
            dataIndex: 'location',
            editable: true,
            key: 'location'
        }, {
            title: '操作',
            key: 'action',
            render: (record) => (
                <span>
                    <QuizStatus courseID={record.course_id} />
                    <a href="javascript::">生成报告</a>
                </span>
            )
        }];
    }

    onSelectChange = (selectedRowKeys) => {
        // console.log('seletedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    remove = () => {
        var newCourses = [...this.state.courses];
        const newSelectedRowKeys = this.state.selectedRowKeys;
        // console.log('seletedRowKeys changed: ', newSelectedRowKeys);
        // console.log('Courses changed: ', newCourses);
        var i = newSelectedRowKeys.length;
        while (i--) {
            // console.log(newCourses.filter(item => item.key === newSelectedRowKeys[i])[0].course_id);
            api.deleteCourse(newCourses.filter(item => item.key === newSelectedRowKeys[i])[0].course_id);
            newCourses = newCourses.filter(item => item.key !== newSelectedRowKeys[i]);
            // newCourses[newSelectedRowKeys[i]].removed = true;
        }
        this.setState({ selectedRowKeys: [], courses: newCourses });
    }

    handleSave = (row) => {
        const newData = [...this.state.courses];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        // console.log(typeof row.student_num)
        if (typeof row.student_num !== 'number')
            row.student_num = parseInt(row.members)
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        // console.log(row);
        api.updateCourse(row);
        this.setState({ courses: newData });
    }

    handleAdd = () => {
        const { count, courses } = this.state;
        const newData = {
            key: count,
            course_id: '5bc2bb2539167622a39bcf64',
            teacher_id: this.props.teacher_id,
            title: '示例课程' + count,
            begin_time: '2018-09-09',
            end_time: '2018-10-09',
            student_num: 30 + count,
            location: '东上院507',
            removed: false,
        };
        this.setState({
            courses: [newData, ...courses],
            count: count + 1,
        });
        api.createCourse(newData);
        
    }

    render() {
        const { selectedRowKeys, courses } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableFormCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });

        return (
            <div>
                <span>
                    <Button type="primary"
                        style={{ margin: '5px 5px'}}
                        onClick={this.handleAdd}>
                        添加课程
                    </Button>
                    <Button type="primary"
                        style={{ margin: '5px 5px' }}
                        disabled={!hasSelected}
                        onClick={this.remove}>
                        移除课程
                    </Button>
                </span>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    rowSelection={rowSelection}
                    dataSource={courses}
                    columns={columns} />
            </div>
        )
    }
}

export default CoursesList;
