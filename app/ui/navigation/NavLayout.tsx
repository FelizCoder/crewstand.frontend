"use client";

import { Button, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import PackageJson from "../../../package.json";
import { getBackendVersion } from "./apiCalls";
import NavMenu from "./navMenu";

const { Sider, Footer, Header, Content } = Layout;

interface NavLayoutProps {
  children: React.ReactNode;
}

const NavLayout: React.FC<NavLayoutProps> = ({ children }) => {
  let [backendVersion, setBackendVersion] = useState<string>("");
  const [collapsed, setCollapsed] = useState(false);

  async function fetchBackendVersion() {
    const version = await getBackendVersion();
    setBackendVersion(version);
  }

  useEffect(() => {
    fetchBackendVersion();
  });

  return (
    <Layout>
      <Header style={{ padding: 0 }}>
        <Button
          type="text"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined style={{ color: "gray" }} />
            ) : (
              <MenuFoldOutlined style={{ color: "gray" }} />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </Header>
      <Layout>
        <Sider
          collapsible
          trigger={null}
          collapsed={collapsed}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            setCollapsed(broken);
          }}
        >
          <div className="demo-logo-vertical" />
          <NavMenu setCollapsed={setCollapsed} />
        </Sider>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        CREWSTAND Project. Created by Felix Kunze. Frontend v
        {PackageJson.version}. Backend v{backendVersion}.
      </Footer>
    </Layout>
  );
};

export default NavLayout;
