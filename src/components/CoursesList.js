import React from 'react';
import api from '../axios';
import { Table, Button, Form, Modal, Input, Icon, message, DatePicker, InputNumber } from 'antd';
import FormStatus from './FormStatus';
import EditableFormCell from './EditableCell';
import {withRouter} from "react-router-dom";
import moment from 'moment';

const EditableContext = React.createContext();
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const failMessage = (m) => {
  message.error('failed to ' + m + ', please try again.');
};

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
                    <FormStatus
                        course_id={record._id}
                        totalNum={record.student_num}
                        self_form={record.self_form}
                        expert_form={record.expert_form}
                        student_form={record.student_form} />
                    <a onClick={this.RouterPush}>生成报告</a>
                </span>
            )
        }];
    }

    RouterPush = () => {
        this.props.history.push("/main/Report");
    }

    componentDidMount() {
        var count = this.state.count;
        api.getCourses(this.props.teacher_id).then(({
            data
        }) => {
            // console.log('componentDidMount');
            // console.log(data);
            for (var key in data) {
                let course = data[key];
                course.key = key;
                course.begin_time = course.begin_time.split("T")[0];
                course.end_time = course.end_time.split("T")[0];
                count = key;
                this.setState({ courses: [...this.state.courses, course] });
            }
        })
        this.setState({ count });
    }

    disabledDate(current) {
        return current && current < moment().endOf('day');
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
                values.begin_time = values.course_time[0]._d.toISOString();
                values.end_time = values.course_time[1]._d.toISOString();
                values.form_end_time = values.form_end_time._d.toISOString();
                // console.log(values);
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
            // console.log(newCourses.filter(item => item.key === newSelectedRowKeys[i])[0]._id);
            let data = {
                "id": newCourses.filter(item => item.key === newSelectedRowKeys[i])[0]._id
            };
            api.deleteCourse(data).then(({
                data
            }) => {
                if (data.success) {
                    // newCourses = newCourses.filter(item => item.key !== newSelectedRowKeys[i]);
                } else {
                    failMessage('remove course');
                }
            })
            // newCourses[newSelectedRowKeys[i]].removed = true;
        }
        window.location.href = '/main/CoursesList';
        // this.setState({ selectedRowKeys: [], courses: newCourses });
    }

    handleSave = (row) => {
        const newData = [...this.state.courses];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        // console.log(typeof row.student_num)
        if (typeof row.student_num !== 'number')
            row.student_num = parseInt(row.student_num);
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
            } else {
                failMessage('edit course data');
            }
        })
    }

    handleAdd = (values) => {
        const { count, courses } = this.state;
        // console.log(values);
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
                // console.log(data);
                newData._id = data.course_id;
                newData.begin_time = newData.begin_time.split("T")[0];
                newData.end_time = newData.end_time.split("T")[0];
                this.setState({
                    courses: [newData, ...courses],
                    count: count + 1,
                });
            } else {
                failMessage('add course');
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
                    width={550}
                    onCancel={this.handleModalCancel}
                    footer={[
                        <Button key="back" onClick={this.handleModalCancel}>取消</Button>,
                    ]}
                >
                    <Form onSubmit={this.handleModalSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="课程名称">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of the course' }],
                            })(
                                <Input prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="课程名称" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="课程时间">
                            {getFieldDecorator('course_time', {
                                rules: [{ required: true, message: 'Please input the begin time of the course' }],
                            })(
                                <RangePicker showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} />
                                // <Input prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="课程开始时间" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="问卷截止时间">
                            {getFieldDecorator('form_end_time', {
                                rules: [{ required: true, message: 'Please add the end time of the survey' }],
                            })(
                                <DatePicker disabledDate={this.disabledDate}
                                    showTime={{ defaultValue: moment('00:00:00') }} />
                                // <Input prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="课程名称" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="上课人数">
                            {getFieldDecorator('student_num', {
                                rules: [{ required: true, message: 'Please input the students\'number of the course' }],
                            })(
                                <InputNumber />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="上课地点">
                            {getFieldDecorator('location', {
                                rules: [{ required: true, message: 'Please input the location of the course' }],
                            })(
                                <Input prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,..25)' }} />} placeholder="上课地点" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button htmlType="submit" type="primary" className="form-button" loading={modalLoading}>
                                提交
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
