import React from 'react';
import QRcode from '../QRcode_mini.jpg';
import { Layout, Menu, Icon } from 'antd';
import CoursesList from '../components/CoursesList';
import Profile from '../components/Profile';
import ProfileData from '../api/ProfileData';
import EditProfile from './EditProfile';
import { BrowserRouter, Route } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }
  data = ProfileData;

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
          // collapsible
          // collapsed={this.state.collapsed}
          // onCollapse={this.onCollapse}
          width='224'
        >
          <Menu
            mode="inline"
            onClick={this.onMenuClick}
            theme="dark"
          >
            <Menu.Item key="1"><Icon type="hdd" theme="outlined" />Courses List</Menu.Item>
            <Menu.Item key="3"><Icon type="user" theme="outlined" />Profile</Menu.Item>
            <div className="footer">
              <img src={QRcode} className="QRcode" alt="QRcode"/>
              <p className="text">Mate @2018 </p>
              <p className="text">Created by Hooli-group</p>
            </div>
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
                <Route path='/main/Profile' component={EditProfile} />
              </div>
            </BrowserRouter>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default MainPage;
