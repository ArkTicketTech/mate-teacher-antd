import React, { Component } from 'react';
import logo from './logo.png';
import QRcode from './QRcode_mini.jpg';
import './App.css';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import MySider from './components/Sider';
import CoursesList from './components/CoursesList';
import EditableList from './components/EditableList';
import EditableTable from './components/EditableTable';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
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
          <MySider />
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
          <Content style={{ margin: '150px 16px' }}>
            <CoursesList />
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
