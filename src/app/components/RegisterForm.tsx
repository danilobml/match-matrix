'use client'

import { useState } from 'react';
import Image from 'next/image';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { useRouter } from 'next/navigation';

import Logo from '../favicon.ico';

const { Title } = Typography;
const { Text } = Typography;

interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: RegisterFormData) => {
    if (values.password !== values.confirmPassword) {
      message.error('Registration error: check if the password and confirm password match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (response.ok) {
        message.success('Registration successful!');
        router.push('/login');
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="login-container register-container">
      <Card className="login-card" style={{ textAlign: 'center' }}>
      <Image src={Logo} alt="logo" width={60} height={60} />
        <Text strong style={{ display: 'block', fontSize: '20px', marginTop: 0 }}>
          MatchMatrix
        </Text>
        <Title level={2} style={{ marginTop: '8px' }}>Register</Title>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Register
            </Button>
            <Button type="default" onClick={handleLogin} style={{ marginLeft: '10px' }}>
              Back
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterForm;
