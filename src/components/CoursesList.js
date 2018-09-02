import React from 'react';
import { Table, Divider, Button } from 'antd';

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
            }]
        }
    }

    state = {
        selectedRowKeys: [],
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('seletedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <div>
                <span>
                    <Button type="primary"
                        style={{ margin: '5px 5px'}}
                        onClick={this.add}>
                        添加课程
                    </Button>
                    <Button type="primary"
                        style={{ margin: '5px 5px'}}
                        onClick={this.remove}>
                        移除课程
                    </Button>
                    <Button type="primary"
                        style={{ margin: '5px 5px'}}
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
