"use client";

import { Button, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
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
  const [isFullscreen, setIsFullscreen] = useState(false);

  async function fetchBackendVersion() {
    const version = await getBackendVersion();
    setBackendVersion(version);
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((err) => {
        console.error("Error attempting to exit fullscreen:", err);
      });
    }
  };

  useEffect(() => {
    fetchBackendVersion();

    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <Layout>
      <Header style={{ padding: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Button
          type="text"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
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
        <Button
          type="text"
          icon={
            isFullscreen ? (
              <FullscreenExitOutlined style={{ color: "gray" }} />
            ) : (
              <FullscreenOutlined style={{ color: "gray" }} />
            )
          }
          onClick={toggleFullscreen}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
            marginRight: 16,
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
