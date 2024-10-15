'use client'

import { Menu, Dropdown, Button, Layout, Typography } from 'antd';
import { DownOutlined, LogoutOutlined, MenuOutlined, HomeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '../favicon.ico';
import Link from 'next/link';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem('RAS_USER');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link href="/home">Home</Link>
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
      <Dropdown overlay={menu} trigger={['click']}>
        <Button type="primary" className="menu-button">
          <span className="menu-text">Menu <DownOutlined /></span>
          <MenuOutlined className="menu-icon" />
        </Button>
      </Dropdown>
    </Header>
  );
};

export default Navbar;
