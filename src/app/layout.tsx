import Head from 'next/head';
import localFont from "next/font/local";
import { ConfigProvider } from 'antd';

import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const customTheme = {
    token: {
      colorPrimary: '#b83347',
      colorLink: '#ba3647',
      colorSuccess: '#cc4e54',
      colorWarning: '#cb4d53',
      colorError: '#c03e4c',
    },
  };

  return (
    <html lang="en">
      <Head>
        <title>MatchMatrix</title>
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ConfigProvider theme={customTheme}>
          <Navbar />
          <div className="main-content">
            {children}
          </div>
        </ConfigProvider>
      </body>
    </html>
  );
}
