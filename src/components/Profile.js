import React from 'react';
import { Drawer, Divider, Col, Row, Avatar, Tag } from 'antd';
import logo from '../resources/logo.png';
import DescriptionItem from './DescriptionItem';
import pStyle from './pStyle';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
    console.log(this.props.teacher);
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Row type="flex" justify="end">
          <Col span={2}> <Avatar src={logo} size={60} shape='square' alt="logo" /> </Col>
          <Col span={2}>
            <Row type="flex">
              <Tag color="#1890ff"><a onClick={this.showDrawer}>详情</a></Tag>
              <Tag color="#1890ff"><a href="/">登出</a></Tag>
            </Row>
            <Row type="flex">
              <DescriptionItem title="用户名" content="hund"/>
            </Row>
          </Col>
        </Row>
        <Drawer
          width={560}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p style={{ ...pStyle, marginBottom: 24 }}>User Profile</p>
          <p style={pStyle}>Personal</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Full Name" content={this.props.teacher.username}/>
            </Col>
            <Col span={12}>
              <DescriptionItem title="E-mail" content={this.props.teacher.mail} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="City" content={this.props.teacher.city} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="School" content={this.props.teacher.school} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Website" content={this.props.teacher.website} />
            </Col>
          </Row>
        </Drawer>
      </div>
    );
  }
}

export default Profile;