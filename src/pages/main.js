import React from 'react';
import QRcode from '../QRcode_mini.jpg';
import { Layout, Menu, Icon } from 'antd';
import CoursesList from '../components/CoursesList';
import Profile from '../components/Profile';
import { BrowserRouter, Route } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

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
      window.location.href = '/main/EditableList';
    if (item.key === '1')
      window.location.href = '/main';
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
            <SubMenu className="submenu" key="sub1" title={<span><Icon type="appstore" /><span>Courses Management</span></span>}>
              <Menu.Item key="1">Courses List</Menu.Item>
              <Menu.Item key="2">Quiz</Menu.Item>
            </SubMenu>
            <SubMenu className="submenu" key="sub2" title={<span><Icon type="appstore" /><span>blablabla</span></span>}>
              <Menu.Item key="3">Profile</Menu.Item>
              <Menu.Item key="4">Config</Menu.Item>
            </SubMenu>
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
                <Route exact path='/main' component={CoursesList} />
                <Route path='/main/EditableList' component={CoursesList} />
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
