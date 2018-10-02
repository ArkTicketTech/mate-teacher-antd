import React from 'react';
import { Table, Button, Form } from 'antd';
import QuizStatus from './QuizStatus';
import EditableCell from './EditableCell';

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
                name: '示例课程' + i,
                season: '2018秋季',
                members: 30 + i,
                site: '东上院507',
                removed: false,
            });
        }

        this.columns = [{
            title: '课程名称',
            dataIndex: 'name',
            editable: true,
            key: 'name'
        }, {
            title: '上课时间',
            dataIndex: 'season',
            editable: true,
            key: 'season'
        }, {
            title: '上课人数',
            dataIndex: 'members',
            editable: true,
            key: 'members'
        }, {
            title: '上课地点',
            dataIndex: 'site',
            editable: true,
            key: 'site'
        }, {
            title: '操作',
            key: 'action',
            render: (record) => (
                <span>
                    <QuizStatus courseID={record.key} />
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
        const newCourses = [...this.state.courses];
        var newSelectedRowKeys = this.state.selectedRowKeys;
        // console.log('seletedRowKeys changed: ', newSelectedRowKeys);
        // console.log('Courses changed: ', newCourses);
        var i = newSelectedRowKeys.length;
        while (i--) {
            console.log(typeof newSelectedRowKeys[i]);
            newCourses[newSelectedRowKeys[i]].removed = true;
        }
        this.setState({ selectedRowKeys: [], Courses: newCourses });
    }

    handleSave = (row) => {
        const newData = [...this.state.courses];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ courses: newData });
    }

    handleAdd = () => {
        const { count, courses } = this.state;
        const newData = {
            key: count,
            name: '示例课程' + count,
            season: '2018秋季',
            members: 30 + count,
            site: '东上院507',
            removed: false,
        };
        this.setState({
            courses: [newData, ...courses],
            count: count + 1,
        });
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
                cell: EditableCell,
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
