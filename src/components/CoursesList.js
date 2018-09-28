import React from 'react';
import { Table, Divider, Button, Input, InputNumber, Form, Popconfirm } from 'antd';
import quizStatus from './quizStatus';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    }

    componentDidMount() {
        if (this.props.editable) {
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }

    componentWillUnmount() {
        if (this.props.editable) {
            document.removeEventListener('click', this.handleClickOutside, true);
        }
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    }

    handleClickOutside = (e) => {
        const { editing } = this.state;
        if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
            this.save();
        }
    }

    save = () => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
        return (
            <td ref={node => (this.cell = node)} {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (
                                    <FormItem style={{ margin: 0 }}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: title + ' is required.',
                                            }],
                                            initialValue: record[dataIndex],
                                        })(
                                            <Input ref={node => (this.input = node)}
                                                onPressEnter={this.save} />
                                        )}
                                    </FormItem>
                                ) : (
                                    <div className="editable-cell-value-wrap"
                                        style={{ paddingRight: 24 }}
                                        onClick={this.toggleEdit}>
                                        {restProps.children}
                                    </div>
                                )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

class CoursesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testArray: [1, 2],
            editingKey: '',
            selectedRowKeys: [],
            courses: [],
            count: 15,
            quizStatusOn: true,
        };

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
            render: () => (
                <span>
                    <a onClick={this.showQuizStatus}>问卷状态</a>
                    <Divider type="vertical" />
                    <a href="javascript::">生成报告</a>
                </span>
            )
        }];

        for (let i = 0; i < 15; i++) {
            this.state.courses.push({
                key: i,
                name: '示例课程'+i,
                season: '2018秋季',
                members: 30 + i,
                site: '东上院507',
                removed: false,
            });
        }
    }

    showQuizStatus = () => {
        console.log(this.state.quizStatusOn);
        this.setState({
            quizStatusOn: true,
        });
    };

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
        const newCourses = [...this.state.courses];
        var newSelectedRowKeys = this.state.selectedRowKeys;
        console.log('seletedRowKeys changed: ', newSelectedRowKeys);
        console.log('Courses changed: ', newCourses);
        var i = newSelectedRowKeys.length;
        while (i--) {
            console.log(typeof newSelectedRowKeys[i]);
            newCourses[newSelectedRowKeys[i]].removed = true;
            // newCourses.filter(item => item.key !== newSelectedRowKeys[i]);
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
                <quizStatus visible={this.state.quizStatusOn} />
            </div>
        )
    }
}

export default CoursesList;
