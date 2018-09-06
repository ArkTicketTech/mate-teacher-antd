import React, { Component } from 'react';
import logo from './logo.png';
import QRcode from './QRcode_mini.jpg';
import './App.css';
import { Layout, Menu, Icon} from 'antd';
import 'antd/dist/antd.css';
import CoursesList from './components/CoursesList';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      openKeys: ['sub1'],
      // content: "CoursesList",
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

  /* onClick = (items) => {
    const itemKey = items.keyPath[0];
    console.log(itemKey);
    if (itemKey === 3) {
      this.setState({ content: "Profile" });
      console.log(itemKey);
    } else if (itemKey !== 1) {
      this.setState({ content: null });
    }
  } */

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    /* const con = this.state.content;
    console.log(con);
    var content = () => {
      if (con === "CoursesList") {
        console.log(con);
        // return <CoursesList />
      } else if (con === "Profile") {
        // return <EditableList />
      } else {
        return null
      }
    }; */

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
            onClick={this.onClick}
            theme="dark"
          >
            <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>Courses Management</span></span>}>
              <Menu.Item key="1">Courses List</Menu.Item>
              <Menu.Item key="2">Quiz</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>blablabla</span></span>}>
              <Menu.Item key="3">Profile</Menu.Item>
              <Menu.Item key="4">Config</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to Mate</h1>
              </header>
            </div>
          </Header>
          <Content className="wrapper-content" style={{ margin: '150px 16px' }}>
            <div className="tab-content">
              <CoursesList />
            </div>
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

export default App;
