import React from 'react';
import QRcode from '../QRcode_mini.jpg';
import { Layout, Menu, Icon } from 'antd';
import CoursesList from '../components/CoursesList';
import Profile from '../components/Profile';
import EditProfile from './EditProfile';
import SurveyList from './SurveyList';
import { BrowserRouter, Route } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      openKeys: ['sub1'],
    };
  }

  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  onCollapse = (collapsed) => {
    const openKeys = collapsed ? [] : ['sub1'];
    this.setState({
      collapsed,
      openKeys
    });
  }

  onMenuClick = (item) => {
    console.log(item.key, typeof item.key);
    if (item.key === '2')
      window.location.href = '/SurveyList';
    if (item.key === '1')
      window.location.href = '/CoursesList';
    if (item.key === '3')
      window.location.href = '/Profile';
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          width='256'
        >
          <Menu
            mode="inline"
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            onClick={this.onMenuClick}
            theme="dark"
          >
            <Menu.Item key="1">Courses List</Menu.Item>
            <Menu.Item key="2">Quiz</Menu.Item>
            <Menu.Item key="3">Profile</Menu.Item>
            <Menu.Item key="4">Config</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#eee', padding: 0 }}>
            <div className="App">
              <header className="App-header">
                <Profile></Profile>
              </header>
            </div>
          </Header>
          <Content className="wrapper-content" style={{ margin: '150px 16px' }}>
            <BrowserRouter>
              <div>
                <Route exact path='/CoursesList' component={CoursesList} />
                <Route path='/SurveyList' component={SurveyList} />
                <Route path='/Profile' component={EditProfile} />
              </div>
            </BrowserRouter>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <img src={QRcode} alt="QRcode"/>
            <p>Mate @2018 Created by Hooli-group</p>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default MainPage;
