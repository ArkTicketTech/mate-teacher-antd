import React from 'react';
import { Divider, Table, Input, InputNumber, Popconfirm, Form } from 'antd';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />
        }
        return <Input />;
    }

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: 'Please Input' + title + '!',
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // testArray: [1, 2],
            editingKey: '',
            selectedRowKeys: [],
            courses: [],
        };
        this.columns = [{
            title: '课程名称',
            dataIndex: 'name',
            key: 'name',
            editable: true
        }, {
            title: '上课时间',
            dataIndex: 'season',
            key: 'season',
            editable: true
        }, {
            title: '上课人数',
            dataIndex: 'members',
            key: 'members',
            editable: true
        }, {
            title: '上课地点',
            dataIndex: 'site',
            key: 'site',
            editable: true
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                const editable = this.isEditing(record);
                return (
                    <div>
                        {editable ? (
                            <span>
                                <EditableContext.Consumer>
                                    {form => (
                                        <a href="javascript::"
                                            onClick={() => this.save(form, record.key)}
                                            style={{ marginRight: 8 }}
                                        >Save</a>
                                    )}
                                </EditableContext.Consumer>
                                <Popconfirm title="Sure to cancel?"
                                    onConfirm={() => this.cancel(record.key)}
                                >
                                    <a>Cancel</a>
                                </Popconfirm>
                            </span>
                        ) : (
                                <a onClick={() => this.edit(record.key)}>Edit</a>
                            )}
                        <Divider type="vertical" />
                        <a href="javascript::">问卷状态</a>
                        <Divider type="vertical" />
                        <a href="javascript::">生成报告</a>
                    </div>
                );
            },
        }];

        // 产生测试数据
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

    isEditing = (record) => {
        return record.key === this.state.editingKey;
    };

    edit(key) {
        this.setState({ editingKey: key });
    }

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newCourses = [...this.state.courses];
            const index = newCourses.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newCourses[index];
                newCourses.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ courses: newCourses, editingKey: '' });
            } else {
                newCourses.push(row);
                this.setState({ courses: newCourses, editingKey: '' });
            }
        });
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    }

    render() {
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
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <Table components={components}
                bordered
                dataSource={this.state.courses}
                columns={columns}
                rowClassName="editable-row"
            />
        );
    }
}

export default EditableTable;