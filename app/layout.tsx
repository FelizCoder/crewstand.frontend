import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import "./ui/icons.css";
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NavLayout from "./ui/navigation/NavLayout";

export const metadata: Metadata = {
  title: process.env.PROJECT_NAME
    ? process.env.PROJECT_NAME
    : "Crewstand Frontend",
  description: "https://github.com/FelizCoder/crewstand.frontend",
  applicationName: process.env.PROJECT_NAME
    ? process.env.PROJECT_NAME
    : "Crewstand Frontend",
  generator: "Next.js",
  publisher: "FelizCoder",
  authors: [{ name: "FelizCoder", url: "https://github.com/FelizCoder" }],
  classification: "Frontend",
  robots: { index: false, follow: false },
};


const RootLayout = ({ children }: React.PropsWithChildren) => {

  return (
    <html lang="en">
      <ConfigProvider wave={{ disabled: true }}>
        {/* Workaround for TypeError: reactRender is not a function. 
        might be resolved in future antd version. https://github.com/ant-design/ant-design/issues/51339*/}
        <body>
          <AntdRegistry>
            <NavLayout>
              {children}
            </NavLayout>
          </AntdRegistry>
        </body>
      </ConfigProvider>
    </html>
  );
}

export default RootLayout;
