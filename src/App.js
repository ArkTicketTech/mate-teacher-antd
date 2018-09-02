import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout } from 'antd';
import MySider from './components/Sider';
import 'antd/dist/antd.css';
import CoursesList from './components/CoursesList';

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
                <h1 className="App-title">Welcome to React</h1>
              </header>
              <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            </div>
          </Header>
          <Content style={{ margin: '150px 16px' }}>
            <CoursesList />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Mate @2018 Created by Hooli-group
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
