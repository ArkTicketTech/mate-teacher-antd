import React from 'react';
import api from '../axios';
import { Drawer, Divider, Col, Row } from 'antd';
import DescriptionItem from './DescriptionItem';
import { ProgressBar } from 'react-bootstrap';
import pStyle from './pStyle';

class QuizStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizs: [{
        name: "for student",
        degree: 49,
        createTime: "2018-10-1",
        dueTime: "2018-10-10",
        totalNumber: 100,
        doneNumber: 49,
        invalid: 4,
        site: "https://blablabla.edu.cn",
      }, {
        name: "for teacher",
        degree: 75,
        createTime: "2018-10-1",
        dueTime: "2018-10-20",
        totalNumber: 8,
        doneNumber: 6,
        invalid: 1,
        site: "https://blablabla.edu.cn",
      }],
      visible: false,
    };
  }

  componentDidMount() {
    api.getAnsFormStatus(this.props.course_id, this.props.form_id);
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onShow = () => {
    this.setState({
      visible: true,
      quizs: [{
        name: "for student",
        degree: 49,
        createTime: "2018-10-1",
        dueTime: "2018-10-10",
        totalNumber: 100,
        doneNumber: 49,
        invalid: 4,
        site: "https://blablabla.edu.cn",
      }, {
        name: "for teacher",
        degree: 75,
        createTime: "2018-10-1",
        dueTime: "2018-10-20",
        totalNumber: 8,
        doneNumber: 6,
        invalid: 1,
        site: "https://blablabla.edu.cn",
      }],
    });
  };

  render() {
    const failedStu = this.state.quizs[0].invalid * 100 / this.state.quizs[0].totalNumber;
    const failedTea = this.state.quizs[1].invalid * 100 / this.state.quizs[1].totalNumber;
    const successStu = this.state.quizs[0].degree - failedStu;
    const successTea = this.state.quizs[1].degree - failedTea;
    return (
      <div>
        <a onClick={this.onShow}>问卷状态</a>
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p style={pStyle}>学生问卷</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="创建时间" content={this.state.quizs[0].createTime} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="截止时间" content={this.state.quizs[0].dueTime} />
            </Col>
            <Col span={24}>
              <DescriptionItem title="问卷地址" content={this.state.quizs[0].site} />
            </Col>
          </Row>
          <p style={pStyle}>问卷完成情况</p>
          <Row>
            <ProgressBar>
              <ProgressBar active bsStyle="success" now={successStu} key={1} />
              <ProgressBar active bsStyle="danger" now={failedStu} key={2} />
            </ProgressBar>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="发放人数" content={this.state.quizs[0].totalNumber} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="已完成人数" content={this.state.quizs[0].doneNumber} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="完成度" content={this.state.quizs[0].degree} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="无效问卷数" content={this.state.quizs[0].invalid} />
            </Col>
          </Row>
          <Divider />
          <p style={pStyle}>专家问卷</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="创建时间" content={this.state.quizs[1].createTime} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="截止时间" content={this.state.quizs[1].dueTime} />
            </Col>
            <Col span={24}>
              <DescriptionItem title="问卷地址" content={this.state.quizs[1].site} />
            </Col>
          </Row>
          <p style={pStyle}>问卷完成情况</p>
          <Row>
            <ProgressBar>
              <ProgressBar active bsStyle="success" now={successTea} key={1} />
              <ProgressBar active bsStyle="danger" now={failedTea} key={2} />
            </ProgressBar>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="发放人数" content={this.state.quizs[1].totalNumber} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="已完成人数" content={this.state.quizs[1].doneNumber} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="完成度" content={this.state.quizs[1].degree} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="无效问卷数" content={this.state.quizs[1].invalid} />
            </Col>
          </Row>
        </Drawer>
      </div>
    );
  }
}

export default QuizStatus;