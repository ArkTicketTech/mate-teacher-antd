import React from 'react';
import api from '../axios';
import { Drawer, Divider, Col, Row } from 'antd';
import DescriptionItem from './DescriptionItem';
import { ProgressBar } from 'react-bootstrap';
import pStyle from './pStyle';

class FormStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 假数据用于完成与服务器交互之前的逻辑渲染，否则网页报错
      forms: [{
        name: "for self",
        doneNumber: 0,
        invalid: 0,
        site: "https://blablabla.edu.cn",
      }, {
        name: "for expert",
        degree: 50,
        createTime: "2018-10-1",
        dueTime: "2018-10-10",
        totalNumber: 10,
        doneNumber: 4,
        invalid: 1,
        site: "https://blablabla.edu.cn",
      }, {
        name: "for student",
        degree: 100,
        createTime: "2018-10-1",
        dueTime: "2018-10-20",
        totalNumber: 80,
        doneNumber: 60,
        invalid: 20,
        site: "https://blablabla.edu.cn",
      }],
      visible: false,
    };
  }

  componentWillMount() {
    // console.log("componentDidMount");
    const href = "http://" + window.location.href.split('/')[2] + "/host/login";
    const course_id = this.props.course_id;
    const totalStu = this.props.totalNum;
    // console.log(course_id, this.props);

    const self = {
      type: "self",
      course_id: course_id,
      form_id: this.props.self_form
    };
    const expert = {
      type: "expert",
      course_id: course_id,
      form_id: this.props.expert_form
    };
    const student = {
      type: "student",
      course_id: course_id,
      form_id: this.props.student_form
    }
    let self_route = '';
    let expert_route = '';
    let student_route = '';
    let { forms } = this.state;

    api.getLink(self).then(({
      data
    }) => {
      self_route = href + '/' + data.route.split('/')[2];
    })
    api.getLink(expert).then(({
      data
    }) => {
      expert_route = href + '/' + data.route.split('/')[2];
    })
    api.getLink(student).then(({
      data
    }) => {
      student_route = href + '/' + data.route.split('/')[2];
    })
    console.log('links', self_route, expert_route, student_route);

    api.getAnsFormStatus(course_id, self.form_id).then(({
      data
    }) => {
      // console.log('self form', data);
      forms[0] = {
        name: "for self",
        doneNumber: data.filled,
        invalid: data.invalid,
        site: self_route,
      }
    })
    api.getAnsFormStatus(course_id, expert.form_id).then(({
      data
    }) => {
      // console.log('expert form', data);
      forms[1] = {
        name: "for expert",
        degree: (Number)((data.filled + data.invalid) * 100 / totalStu),
        // createTime: "2018-10-1",
        // dueTime: "2018-10-10",
        createTime: data.create_time,
        dueTime: data.due_time,
        totalNumber: totalStu,
        doneNumber: data.filled,
        invalid: data.invalid,
        site: expert_route,
      }
    })
    api.getAnsFormStatus(course_id, student.form_id).then(({
      data
    }) => {
      // console.log('student form', data);
      forms[2] = {
        name: "for student",
        degree: (Number)((data.filled + data.invalid) * 100 / totalStu),
        // createTime: "2018-10-1",
        // dueTime: "2018-10-10",
        createTime: data.create_time,
        dueTime: data.due_time,
        totalNumber: totalStu,
        doneNumber: data.filled,
        invalid: data.invalid,
        site: student_route,
      }
    })
    this.setState({ forms: forms })
    console.log("didmount", forms)
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onShow = () => {
    // console.log(this.props.courseID)
    this.setState({
      visible: true
    });
  };

  render() {
    const { forms } = this.state;
    console.log("forms", forms)
    const failedStu = forms[2].invalid * 100 / forms[2].totalNumber;
    const failedExp = forms[1].invalid * 100 / forms[1].totalNumber;
    const successStu = forms[2].degree - failedStu;
    const successExp = forms[1].degree - failedExp;

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
            <Col span={16}>
              <DescriptionItem title="截止时间" content={forms[2].dueTime ? forms[2].dueTime : '-'} />
              <DescriptionItem title="问卷地址" content={<a href={forms[2].site}>{forms[2].site}</a>} />
            </Col>
            <Col span={8}>
              <img src={'http://47.88.223.165/api/v1/qr?detailedURL='+forms[2].site+'&size=3'} />
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
              <DescriptionItem title="发放人数" content={forms[2].totalNumber} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="已完成人数" content={forms[2].doneNumber} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="完成度" content={forms[2].degree} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="无效问卷数" content={forms[2].invalid} />
            </Col>
          </Row>
          <Divider />
          <p style={pStyle}>专家问卷</p>
          <Row>
            <Col span={16}>
              <DescriptionItem title="截止时间" content={forms[1].dueTime ? forms[1].dueTime : '-'} />
              <DescriptionItem title="问卷地址" content={<a href={forms[1].site}>{forms[1].site}</a>} />
            </Col>
            <Col span={8}>
              <img src={'http://47.88.223.165/api/v1/qr?detailedURL='+forms[1].site+'&size=3'} />
            </Col>
          </Row>
          <p style={pStyle}>问卷完成情况</p>
          <Row>
            <ProgressBar>
              <ProgressBar active bsStyle="success" now={successExp} key={1} />
              <ProgressBar active bsStyle="danger" now={failedExp} key={2} />
            </ProgressBar>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="发放人数" content={forms[1].totalNumber} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="已完成人数" content={forms[1].doneNumber} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="完成度" content={forms[1].degree} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="无效问卷数" content={forms[1].invalid} />
            </Col>
          </Row>
          <Divider />
          <p style={pStyle}>自测问卷</p>
          <Row>
            <Col span={16}>
              <p> {forms[0].doneNumber ? "已完成" : "未完成"}</p>
              <DescriptionItem title="问卷地址" content={<a href={forms[0].site}>{forms[0].site}</a>} />
            </Col>
            <Col span={8}>
              <img src={'http://47.88.223.165/api/v1/qr?detailedURL='+forms[0].site+'&size=3'} />
            </Col>
          </Row>
        </Drawer>
      </div>
    );
  }
}

// TODO: 后端返回问卷截止时间

export default FormStatus;