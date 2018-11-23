import React from 'react';
import asyncComponent from './AsyncComponent'
import { Row, Col } from 'antd';

const BoxplotReact = asyncComponent(() => import(/* webpackChunkName: "Bar" */'../echarts/BoxplotReact'))
const BarReact = asyncComponent(() => import(/* webpackChunkName: "Bar" */'../echarts/BarReact'))

class StudentResponse extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Row  type="flex" justify="start">
          <Col span={10}>
            <BarReact option={this.props.bar_option} />
          </Col>
          <Col span={10} offset={1}>
            <BoxplotReact option={this.props.boxplot_option} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default StudentResponse;