import React, { Component } from 'react';
import api from '../axios'
import { Tabs, Divider, List, Card, Avatar, Breadcrumb, Col, Row, Button, Icon} from 'antd';
import {withRouter} from "react-router-dom";
import { pieOption, barOption, picbarOption, scatterOption, pieOption_grd, pieOption_org, radarOption, radarOption_std, barOption_std, boxplotOption} from '../api/ChartsData'
import CourseFeature from '../components/CourseFeature'
import TeacherFeature from '../components/TeacherFeature'
import StudentFeature from '../components/StudentFeature'
import TeachingBehavior from '../components/TeachingBehavior'
import StudentResponse from '../components/StudentResponse'
import PeerObservation from '../components/PeerObservation'
import echarts from 'echarts/lib/echarts'
import { prepareBoxplotData } from 'echarts/extension/dataTool';
const TabPane = Tabs.TabPane;

class Report extends Component {

  teacherInfo = JSON.parse(localStorage.getItem("mateAccountInfo"));//get teacher's imformation
  //for test
  // teacherInfo = {
  //   name: '马荔',
  //   school: '上海交通大学',
  //   age: 40,
  //   seniority: 30,
  //   title: '高级',
  // }

  constructor(props) {
    super(props);
    this.state = {
      //course_id
      id: '', 
      //course info
      course_title: '元素化学',
      course_type: '核心',
      course_student_num: 0,
      course_semester: '2018春',
      //form status
      expert_form_id: '',
      student_form_id: '',
      status_filled: 10,
      status_invalid: 1,
      status_expert_filled: 1,
      //Report data
      genderNum: [],
      gradeNum: [],
      organizeNum: [],
      reading: 0.0,
      passion: 0.0,
      humor: 0.0,
      justice: 0.0,
      strictness: 0.0,
      difficulty: 0.0,
      homework: 0.0,
      behavior_student: [],
      behavior_self: [],
      behavior_expert: [],
      advBehavePos: [],
      advBehaveNeg: [],
      teacherSatisfaction: [],
      courseSatisfaction: [],
      learningStyle: []
    };
  }

  render() {
    const Infodata = [
      {
        title: '基本情况',
        content: <p>本报告为“多元教学有效性评估项目Multi-approach Assessment of Teaching Effectiveness”的课程级反馈报告。评估实施于{this.state.course_semester}，学生评价数据来自一个自然班，在册{this.state.course_student_num}人，回收问卷{this.state.status_filled}份，其中有效问卷{this.state.status_filled-this.state.status_invalid}份，有效率{100-this.state.status_invalid/this.state.status_filled}%；同行评议数据来自{this.state.status_expert_filled}位观察员对一次课的教学实录视频的观察记录。</p>
      },
      {
        title: '评价方法',
        content: <p>MATE 模型考察课程教学有效性遵循教学行为、课程特质、教师特质、学生特质、学习成效和学生满意度等6个维度，采用评估工具包括学生评教、同行评议和教师自评等3种方式。本次评估缺失的模块为学习成效。</p>
      },
      {
        title: '用途申明',
        content: <p>本报告旨在为参加评估项目的任课教师提供教学改进的反馈与建议，属于形成性评价。如用作对不同课程、教师比较目的（如考核、管理等），可能在信度、效度上有待进一步检验，请慎重使用。本评估项目组对任何他做用途不承担任何责任。关于本报告使用如有问题，请联系教学发展中心邢磊(<a href='mailto:xinglei@sjtu.edu.cn'>xinglei@sjtu.edu.cn</a>)。</p>
      },
    ];
    //modify the Option using the real value
    pieOption.series[0].data[0].value = this.state.passion
    pieOption.series[0].data[1].value = this.state.justice
    pieOption.series[0].data[2].value = this.state.strictness
    pieOption.series[0].data[3].value = this.state.humor
    barOption.series[0].data = [this.state.reading, this.state.homework, this.state.difficulty]//本课程
    picbarOption.series[0].data[0].value = 1//male number
    picbarOption.series[1].data[0].value = 2//female number this.state.genderNum
    scatterOption.series[0].data = this.state.learningStyle
    pieOption_grd.series[0].data = this.state.gradeNum
    pieOption_org.series[0].data = this.state.organizeNum
    var orgList = []
    var i = 0
    for (i=0; i < this.state.organizeNum.length; i++) {
      // console.log(this.state.organizeNum[i].name)
      orgList.push(this.state.organizeNum[i].name)
    }
    pieOption_org.legend.data = orgList
    // console.log(this.state.organizeNum)
    radarOption.series[0].data[0].value = this.state.behavior_self
    radarOption.series[0].data[1].value = this.state.behavior_student
    radarOption.series[0].data[2].value = this.state.behavior_expert
    radarOption_std.series[0].data[0].value = this.state.behavior_student//本课程
    barOption_std.series[0].data[0] = this.state.teacherSatisfaction
    barOption_std.series[1].data[0] = this.state.courseSatisfaction
  
    var data = echarts.dataTool.prepareBoxplotData([
      [4,4,1,1,2,3,4,5,5,4,3,3,4,4,4,4,5,5,5,4],
      [5,5,1,1,1,3,2,5,5,5,3,2,3,3,3,4,4,4,5,5]
    ]);//本课程
    boxplotOption.series[0].data = data.boxData
    boxplotOption.series[1].data = [4.7, 5]//全库

    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>用户：{this.teacherInfo.name}</Breadcrumb.Item>
              <Breadcrumb.Item>教学有效性反馈报告</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <div style={{ paddingBottom: 10}}>
            <Avatar style={{ backgroundColor: '#1890ff', verticalAlign: 'middle' }} size="large" icon='idcard'/>
            <Button size="small" style={{ margin: 16, verticalAlign: 'middle' }}>{this.teacherInfo.name}</Button>
            <Avatar style={{ backgroundColor: '#1890ff', verticalAlign: 'middle' }} size="large" icon='book'/>
            <Button size="small" style={{ margin: 16, verticalAlign: 'middle' }}>{this.state.course_title}</Button>
            <Avatar style={{ backgroundColor: '#1890ff', verticalAlign: 'middle' }} size="large" icon='calendar'/>
            <Button size="small" style={{ margin: 16, verticalAlign: 'middle' }}>{this.state.course_semester}</Button>
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
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab={<span><Icon type="tags" />课程特质</span>} key="1">
              <CourseFeature 
                teacher_school={this.teacherInfo.school} 
                course_title={this.state.course_title} 
                course_type={this.state.course_type} 
                course_student_num={this.state.course_student_num}
                chart_option={barOption}
              />
            </TabPane>
            <TabPane tab={<span><Icon type="team" />教师特质</span>} key="2">
              <TeacherFeature 
                teacher_name={this.teacherInfo.name} 
                teacher_age={this.teacherInfo.age} 
                teacher_seniority={this.teacherInfo.seniority} 
                teacher_title={this.teacherInfo.title}
                chart_option={pieOption}
              />
            </TabPane>
            <TabPane tab={<span><Icon type="pie-chart" />学生特质</span>} key="3">
              <StudentFeature
                gender_option={picbarOption}
                study_option={scatterOption}
                grade_option={pieOption_grd}
                organize_option={pieOption_org}
              />
            </TabPane>
            <TabPane tab={<span><Icon type="calculator" />教学行为</span>} key="4">
              <TeachingBehavior
                all_option={radarOption}
                std_option={radarOption_std}
              />
            </TabPane>
            <TabPane tab={<span><Icon type="line-chart" />学生反应</span>} key="5">
              <StudentResponse
                bar_option={barOption_std}
                boxplot_option={boxplotOption}
              />
            </TabPane>
            <TabPane tab={<span><Icon type="solution" />同行观察</span>} key="6">
              <PeerObservation
                Posdata={this.state.advBehavePos}
                Negdata={this.state.advBehaveNeg}
              />
            </TabPane>
          </Tabs>
        </div>
        <div style={{ padding: 20}} align="center">
          <Button type="primary" onClick={this.RouterPush}>返回</Button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // from the path `/main/Report/:id`
    var course_id = this.props.match.params.id;
    this.setState({ id: course_id });

    // get data using api
    api.getCourseInfo(course_id).then(({
      data
    }) => {
      this.setState({
        course_title: data.title,
        course_type: data.type,
        course_student_num: data.student_num,
        expert_form_id: data.expert_form,
        student_form_id: data.student_form
      });
      var course_end_time = data.end_time.split('-');//YYYY-MM-DDT...
      if (course_end_time[1]<'07') {
        this.setState({course_semester: course_end_time[0]+'春'});
      } else {
        this.setState({course_semester: course_end_time[0]+'秋'});
      }
    })

    api.getAnsFormStatus(course_id, this.state.expert_form_id).then(({
      data
    }) => {
      this.setState({status_expert_filled: data.filled});
    })
    api.getAnsFormStatus(course_id, this.state.student_form_id).then(({
      data
    }) => {
      this.setState({
        status_filled: data.filled,
        status_invalid: data.invalid
      });
    })

    api.getReport(course_id).then(({
      data
    }) => {
      // console.log('report', data);
      this.setState({
        genderNum: data.genderNum,
        gradeNum: data.gradeNum,
        organizeNum: data.organizeNum,
        reading: data.reading,
        passion: data.passion,
        humor: data.humor,
        justice: data.justice,
        strictness: data.strictness,
        behavior_student: data.behavior_student,
        behavior_self: data.behavior_self,
        behavior_expert: data.behavior_expert,
        advBehavePos: data.advBehavePos,
        advBehaveNeg: data.advBehaveNeg,
        teacherSatisfaction: data.teacherSatisfaction,
        courseSatisfaction: data.courseSatisfaction,
        learningStyle: data.learningStyle,
        difficulty: data.difficulty,
        homework: data.homework
      });
    })
  }

  RouterPush = () => {
    this.props.history.push("/main/CoursesList");
  }

  callback = (key) => {
    console.log(key);
  }
}

export default withRouter(Report);