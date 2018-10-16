import React from 'react';
import QRcode from '../QRcode_mini.jpg';
import { Layout, Menu, Icon } from 'antd';
import CoursesList from '../components/CoursesList';
import Profile from '../components/Profile';
import ProfileData from '../api/ProfileData';
import EditProfile from './EditProfile';
import SurveyList from './SurveyList';
import { BrowserRouter, Route } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  data = ProfileData;

  onCollapse = (collapsed) => {
    this.setState({
      collapsed
    });
  }

  onMenuClick = (item) => {
    console.log(item.key, typeof item.key);
    if (item.key === '1')
      window.location.href = '/main/CoursesList';
    if (item.key === '2')
      window.location.href = '/main/SurveyList';
    if (item.key === '3')
      window.location.href = '/main/Profile';
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
            <Menu.Item key="1"><Icon type="hdd" theme="outlined" />Courses List</Menu.Item>
            <Menu.Item key="2"><Icon type="book" theme="outlined" />Quiz</Menu.Item>
            <Menu.Item key="3"><Icon type="user" theme="outlined" />Profile</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#eee', padding: 0 }}>
            <div className="App">
              <header className="App-header">
                <Profile teacher={this.data}/>
              </header>
            </div>
          </Header>
          <Content className="wrapper-content" style={{ margin: '150px 16px' }}>
            <BrowserRouter>
              <div>
                <Route exact path='/main/CoursesList' component={() => <CoursesList teacher_id="5bc2b5e9a741d422287f16ff" />} />
                <Route path='/main/SurveyList' component={SurveyList} />
                <Route path='/main/Profile' component={EditProfile} />
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
