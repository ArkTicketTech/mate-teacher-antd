import React from 'react';
import api from '../axios';
import { Table, Button, Form, Modal, Input, Icon } from 'antd';
import QuizStatus from './QuizStatus';
import EditableFormCell from './EditableCell';
import { getFileItem } from 'antd/lib/upload/utils';
import {withRouter} from "react-router-dom";

const EditableContext = React.createContext();
const FormItem = Form.Item;

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
            modalVisible: false,
            modalLoading: false,
            selectedRowKeys: [],
            courses: [],
            count: 15, //课程总数
            quizStatusOn: true,
        };

        this.columns = [{
            title: '课程名称',
            dataIndex: 'title',
            editable: false,
            key: 'title'
        }, {
            title: '开始时间',
            dataIndex: 'begin_time',
            editable: false,
            key: 'begin_time'
        }, {
            title: '结束时间',
            dataIndex: 'end_time',
            editable: false,
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
                    <QuizStatus courseID={record._id} />
                    <a onClick={this.RouterPush}>生成报告</a>
                </span>
            )
        }];

        for (let i = 0; i < 15; i++) {
            this.state.courses.push({
                key: i,
                _id: '5bc2bb2539167622a39bcf64',
                teacher_id: this.props.teacher_id,
                title: '示例课程' + i,
                begin_time: '2018-09-09',
                end_time: '2018-10-09',
                student_num: 30 + i,
                location: '东上院507',
                removed: false,
            });
        }
    }

    RouterPush = () => {
        this.props.history.push("/main/Report");
    }

    componentDidMount() {
        var count = this.state.count;
        api.getCourses(this.props.teacher_id).then(({
            data
        }) => {
            for (var course in data.courses) {
                course.key = count;
                ++count;
                this.state.courses.push(course);
            }
        })
        this.setState({ count });
    }

    showModal = () => {
        this.setState({
            modalVisible: true,
        });
    }

    handleModalSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.handleAdd(values);
                this.setState({ modalVisible: false });
            }
        })
    }

    handleModalCancel = () => {
        this.setState({ modalVisible: false });
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

        // TODO: don't make functions within a loop
        var i = newSelectedRowKeys.length;
        while (i--) {
            console.log(newCourses.filter(item => item.key === newSelectedRowKeys[i])[0]._id);
            api.deleteCourse(newCourses.filter(item => item.key === newSelectedRowKeys[i])[0]._id).then(({
                data
            }) => {
                if (data.success) {
                    newCourses = newCourses.filter(item => item.key !== newSelectedRowKeys[i]);
                }
            })
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
        api.updateCourse(row).then(({
            data
        }) => {
            if (data.success) {
                this.setState({ courses: newData });
            }
        })
    }

    handleAdd = (values) => {
        const { count, courses } = this.state;
        console.log(values);
        const newData = {
            key: count,
            _id: '',
            teacher_id: this.props.teacher_id,
            title: values.title,
            begin_time: values.begin_time,
            end_time: values.end_time,
            survey_end_time: values.survey_end_time,
            student_num: values.student_num,
            location: values.location,
            removed: false,
        };
        api.createCourse(newData).then(({
            data
        }) => {
            if (data.success) {
                newData._id = data.course_id;
                this.setState({
                    courses: [newData, ...courses],
                    count: count + 1,
                });
            }
        });
    }

    render() {
        const { selectedRowKeys, courses, modalLoading, modalVisible } = this.state;
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
        const { getFieldDecorator } = this.props.form;
        // 表单元素label和input的样式
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
            <div>
                <span>
                    <Button type="primary"
                        style={{ margin: '5px 5px' }}
                        // onClick={this.handleAdd}>
                        onClick={this.showModal}>
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
                    columns={columns}
                    pagination={{ pageSize: 6 }} />
                <Modal
                    visible={modalVisible}
                    title="课程信息"
                    onCancel={this.handleModalCancel}
                    footer={[
                        <Button key="back" onClick={this.handleModalCancel}>Return</Button>,
                    ]}
                >
                    <Form onSubmit={this.handleModalSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="Title">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of the course' }],
                            })(
                                <Input prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="课程名称" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Location">
                            {getFieldDecorator('location', {
                                rules: [{ required: true, message: 'Please input the location of the course' }],
                            })(
                                <Input prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="上课地点" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button htmlType="submit" type="primary" className="form-button" loading={modalLoading}>
                                Submit
                            </Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

CoursesList = Form.create({})(CoursesList);
export default withRouter(CoursesList);