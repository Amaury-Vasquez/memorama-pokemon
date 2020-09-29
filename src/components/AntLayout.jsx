import React from "react";
import { Layout, Breadcrumb } from "antd";

import logo from "../assets/pokebola.svg";
const { Header, Content, Footer } = Layout;

function AntLayout(props) {
  return (
    <Layout className="layout home-content">
      <Header>
        <div className="logo">
          <img className="logo-img" src={logo} alt="logo" />
          <h3 className="title">memorama pokemon </h3>
        </div>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Game</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">{props.children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Creado por @AmauryVasquez</Footer>
    </Layout>
  );
}

export default AntLayout;
