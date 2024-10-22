'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { useRouter } from 'next/navigation';

import Logo from '../favicon.ico';

const { Title, Text } = Typography;

interface LoginData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: LoginData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (response.ok) {
        sessionStorage.setItem('RAS_USER', JSON.stringify({ userId: result.userId, raSmorgasboardId: result.raSmorgasboardId, sharedRaSmorgasboardId: result.sharedRaSmorgasboardId,
          shared: result.shared }));
        router.push('/home');
      } else if (response.status === 401) {
        message.error("Invalid username or password. If you don't have one yet, please click on Register.");
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <div className="login-container">
      <Card className="login-card" style={{ textAlign: 'center' }}>
        <Image src={Logo} alt="logo" width={60} height={60} />
        <Text strong style={{ display: 'block', fontSize: '20px', marginTop: 0 }}>
          MatchMatrix
        </Text>
        <Title level={2} style={{ marginTop: '8px' }}>Login</Title>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Login
            </Button>
            <Button type="default" onClick={handleRegister} style={{ marginLeft: '10px' }}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
