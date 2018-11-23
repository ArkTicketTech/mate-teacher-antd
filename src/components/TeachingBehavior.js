import React from 'react';
import asyncComponent from './AsyncComponent'
import { Row, Col, List } from 'antd';

const RadarReact = asyncComponent(() => import(/* webpackChunkName: "Bar" */'../echarts/RadarReact'))

class TeachingBehavior extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Infodata = [
        '1 教师讲课清晰',
        '2 教师确保围绕教学目标开展充分高效的教学',
        '3 教师对学生寄予高的期望并确保成功',
        '4.1 教师发展学生合作',
        '4.2 教师鼓励学生主动学习',
        '4.3 教师尊重个体差异性',
        '5 教师给予学生及时的反馈'
    ];
    
    return (
      <div>
        <Row  type="flex" justify="start">
          <Col span={10}>
            <RadarReact option={this.props.all_option} />
            <RadarReact option={this.props.std_option} />
          </Col>
          <Col span={10} offset={1}>
            <List
              size='large'
              header={<div>详细说明</div>}
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

export default TeachingBehavior;