import React from 'react';

class CourseFeature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <BarReact option={barOption} />
          </Col>
          <Col class="column">
            <h4>开课学校：上海交通大学</h4>
            <h4>所属学科：化学</h4>
            <h4>课程名称：元素化学</h4>
            <h4>课程类型：专业核心课</h4>
            <h4>学 生 数：36 人</h4>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CourseFeature;