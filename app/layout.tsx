import React from "react";
import type { Metadata } from "next";
import StyledComponentsRegistry from "./AntdRegistry";
import "./globals.css";

export const metadata: Metadata = {
  title: process.env.PROJECT_NAME ? process.env.PROJECT_NAME : "Crewstand Frontend",
  description: "https://github.com/FelizCoder/crewstand.frontend",
  applicationName: process.env.PROJECT_NAME ? process.env.PROJECT_NAME : "Crewstand Frontend",
  generator: "Next.js",
  publisher: "FelizCoder",
  authors: [{ name: "FelizCoder", url: "https://github.com/FelizCoder" }],
  classification: "Frontend",
  robots: { index: false, follow: false },
};

function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}

export default RootLayout;
