import React from 'react';
import logo from '../resources/logo.png';
import { Drawer, Divider, Col, Row } from 'antd';
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
          <Col span={2}> <img src={logo} className="main-logo" alt="logo" /> </Col>
          <Col span={2}>
            <Row type="flex" align="middle">
              <DescriptionItem title="用户名" content="hund"/>
            </Row>
            <Row type="flex" align="top">
              <Col span={8}> <a onClick={this.showDrawer}>详情</a> </Col>
              <Col span={8}> <a href="/">登出</a> </Col>
            </Row>
          </Col>
        </Row>
        <Drawer
          width={640}
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