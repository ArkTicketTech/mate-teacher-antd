import React from 'react';
import asyncComponent from './AsyncComponent'
import { Row, Col } from 'antd';

const PieReact = asyncComponent(() => import(/* webpackChunkName: "Bar" */'../echarts/PieReact'))
const ScatterReact = asyncComponent(() => import(/* webpackChunkName: "Bar" */'../echarts/ScatterReact'))
const PicBarReact = asyncComponent(() => import(/* webpackChunkName: "Bar" */'../echarts/PicBarReact'))

class StudentFeature extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Row  type="flex" justify="start">
          <Col span={10}>
            <PicBarReact option={this.props.gender_option} />
          </Col>
          <Col span={10} offset={1}>
            <ScatterReact option={this.props.study_option} />
          </Col>
        </Row>
        <Row  type="flex" justify="start">
          <Col span={10}>
            <PieReact option={this.props.grade_option} />
          </Col>
          <Col span={10} offset={1}>
            <PieReact option={this.props.organize_option} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default StudentFeature;