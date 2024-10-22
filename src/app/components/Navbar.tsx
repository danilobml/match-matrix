'use client';

import { Menu, Dropdown, Button, Layout, Typography } from 'antd';
import { DownOutlined, LogoutOutlined, MenuOutlined, HomeOutlined, UserOutlined, BarChartOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import Logo from '../favicon.ico';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = sessionStorage.getItem('RAS_USER');
      setIsLoggedIn(!!user);
    }
  }, [pathname]);

  const handleLogout = async () => {
    sessionStorage.removeItem('RAS_USER');
    setIsLoggedIn(false);
    router.push('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link href="/home">Home</Link>
      </Menu.Item>
      <Menu.Item key="share" icon={<UserOutlined />}>
        <Link href="/share">Share</Link>
      </Menu.Item>
      <Menu.Item key="charts" icon={<BarChartOutlined />}>
        <Link href="/charts">Charts</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="navbar-header">
      <div className="navbar-logo-title">
        <Image src={Logo} alt="Logo" width={40} height={40} className="navbar-logo" />
        <Link href="/home">
          <Title level={3} className="navbar-title">
            MatchMatrix
          </Title>
        </Link>
      </div>
      {isLoggedIn && (
        <Dropdown overlay={menu} trigger={['click']}>
          <Button type="primary" className="menu-button">
            <span className="menu-text">
              Menu <DownOutlined />
            </span>
            <MenuOutlined className="menu-icon" />
          </Button>
        </Dropdown>
      )}
    </Header>
  );
};

export default Navbar;
