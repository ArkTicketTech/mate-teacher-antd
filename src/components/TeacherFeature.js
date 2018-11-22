import React from 'react';
import asyncComponent from './AsyncComponent'
import { Row, Col, List } from 'antd';

const PieReact = asyncComponent(() => import(/* webpackChunkName: "Bar" */'../echarts/PieReact'))

class TeacherFeature extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Infodata = [
      <p>姓 名：{this.props.teacher_name}</p>,
      <p>年 龄：{this.props.teacher_age}</p>,
      <p>教 龄：{this.props.teacher_seniority}</p>,
      <p>职 称：{this.props.teacher_title}</p>,
    ];

    return (
      <div>
        <Row  type="flex" justify="start">
          <Col span={10}>
            <PieReact option={this.props.chart_option} />
          </Col>
          <Col span={10} offset={1}>
            <List
              // size='small'
              // header={<div>详细信息</div>}
              bordered
              dataSource={Infodata}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default TeacherFeature;