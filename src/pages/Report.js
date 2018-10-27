import React, { Component } from 'react';
import { Tabs, Divider, List, Card, Avatar, Breadcrumb, Col, Row, Button, Icon} from 'antd';
import asyncComponent from '../components/AsyncComponent'
import {withRouter} from "react-router-dom";
// import { pieOption, barOption, pieOption_std, scatterOption, pieOption_grd, pieOption_dpt, radarOption, radarOption_std, barOption_std, candlestick, candlestickOption} from './optionConfig/options'
const PieReact = asyncComponent(() => import(/* webpackChunkName: "Pie" */'../echarts/PieReact'))
const BarReact = asyncComponent(() => import(/* webpackChunkName: "Bar" */'../echarts/BarReact'))
const ScatterReact = asyncComponent(() => import(/* webpackChunkName: "Scatter" */'../echarts/ScatterReact'))
const CandlestickReact = asyncComponent(() => import(/* webpackChunkName: "Map" */'../echarts/CandlestickReact'))
const RadarReact = asyncComponent(() => import(/* webpackChunkName: "Radar" */'../echarts/RadarReact'))
const TabPane = Tabs.TabPane;
const Infodata = [
  {
    title: '基本情况',
    content: <p>本报告为“多元教学有效性评估项目Multi-approach Assessment of Teaching Effectiveness”的课程级反馈报告。评估实施于2018年春季学期，学生评价数据来自一个自然班，在册36人，回收问卷34份，其中有效问卷21份，有效率58%；同行评议数据来自3位观察员对一次课的教学实录视频的观察记录。</p>
  },
  {
    title: '评价方法',
    content: <p>MATE 模型考察课程教学有效性遵循教学行为、课程特质、教师特质、学生特质、学习成效和学生满意度等6个维度，采用评估工具包括学生评教、同行评议和教师自评等 3 种方式。本次评估缺失的模块为学习成效。</p>
  },
  {
    title: '用途申明',
    content: <p>本报告旨在为参加评估项目的任课教师提供教学改进的反馈与建议，属于形成性评价。如用作对不同课程、教师比较目的（如考核、管理等），可能在信度、效度上有待进一步检验，请慎重使用。本评估项目组对任何他做用途不承担任何责任。关于本报告使用如有问题，请联系教学发展中心邢磊(<a href='mailto:xinglei@sjtu.edu.cn'>xinglei@sjtu.edu.cn</a>)。</p>
  },
];

class Report extends Component {
  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>用户：hund</Breadcrumb.Item>
              <Breadcrumb.Item>教学有效性反馈报告</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <div style={{ paddingBottom: 10}}>
            <Avatar style={{ backgroundColor: '#1890ff', verticalAlign: 'middle' }} size="large" icon='idcard'/>
            <Button size="small" style={{ margin: 16, verticalAlign: 'middle' }}>马荔</Button>
            <Avatar style={{ backgroundColor: '#1890ff', verticalAlign: 'middle' }} size="large" icon='book'/>
            <Button size="small" style={{ margin: 16, verticalAlign: 'middle' }}>元素化学</Button>
            <Avatar style={{ backgroundColor: '#1890ff', verticalAlign: 'middle' }} size="large" icon='calendar'/>
            <Button size="small" style={{ margin: 16, verticalAlign: 'middle' }}>2018春季</Button>
          </div>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={Infodata}
            renderItem={item => (
              <List.Item>
                <Card type='inner' title={item.title}>{item.content}</Card>
              </List.Item>
            )}
          />
          <Divider>教学有效性反馈</Divider>
          <Tabs defaultActiveKey="1" type='card' onChange={this.callback}>
            <TabPane tab={<span><Icon type="tags" />课程特质</span>} key="1">Content of Tab Pane 1</TabPane>
            <TabPane tab={<span><Icon type="team" />教师特质</span>} key="2">Content of Tab Pane 2</TabPane>
            <TabPane tab={<span><Icon type="pie-chart" />学生特质</span>} key="3">Content of Tab Pane 3</TabPane>
            <TabPane tab={<span><Icon type="calculator" />教学行为</span>} key="4">Content of Tab Pane 3</TabPane>
            <TabPane tab={<span><Icon type="line-chart" />学生反应</span>} key="5">Content of Tab Pane 3</TabPane>
            <TabPane tab={<span><Icon type="solution" />同行观察</span>} key="6">Content of Tab Pane 3</TabPane>
          </Tabs>
        </div>
        <div style={{ padding: 20}} align="center">
          <Button type="primary" icon='reload' onClick={this.RouterPush}>返回</Button>
        </div>
      </div>
    );
  }

  RouterPush = () => {
    this.props.history.push("/main/CoursesList");
  }

  callback = (key) => {
    console.log(key);
  }
}

export default withRouter(Report);