import React from 'react';
import logo from '../logo.png';
import { Drawer, Divider, Col, Row } from 'antd';
import DescriptionItem from './DescriptionItem';
import pStyle from './pStyle';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      fullName: 'hund030',
      Account: "mate2018@hooligroup.com",
      School: "SJTU",
      City: "Shanghai",
      Country: "China",
      Message: "too lazy to metion anything",
      Email: "mate2018@hooligroup.com",
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
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
          <Col span={2}> <img src={logo} className="Main-logo" alt="logo" /> </Col>
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
              <DescriptionItem title="Full Name" content={this.state.fullName}/>
            </Col>
            <Col span={12}>
              <DescriptionItem title="Account" content={this.state.Account} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="City" content={this.state.City} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Country" content={this.state.Country} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="School" content={this.state.School} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Website" content="-" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem title="Message" content={this.state.Message} />
            </Col>
          </Row>
          <Divider />
        </Drawer>
      </div>
    );
  }
}

export default Profile;