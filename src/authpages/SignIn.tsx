import React from 'react';
import { Form, Input, Select, Button, Typography, Space, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, KeyOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Title } = Typography;
const { Option } = Select;

const LoginPage: React.FC = () => {
  const router = useNavigate();  
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
        try {
            const response = await axios.post(`/api/users/login`, {
                email: values.email,
                password: values.password,
            });
            const { token } = response.data;
            // show toast message
            message.success('Login successfully');
            
            login(token);
        } catch (err: any) {
            message.error(err.response.data);
        }
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      }}
    >
      <div style={{ maxWidth: 400, backgroundColor: 'white', padding: '40px', borderRadius: '8px' }}>
        <Title level={3} style={{ textAlign: 'center', fontFamily: 'Roboto, sans-serif' }}>
          Sign In
        </Title>
        <div>
            <p>
                Not have an account? <Link to="/auth/sign-up">Sign up</Link>
            </p>
        </div>
        <Divider />
        <Form onFinish={formik.handleSubmit}>
          <Form.Item
            name="email"
            help={formik.errors.email}
            validateStatus={formik.errors.email ? 'error' : undefined}
          >
            <Input
              prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item
            name="password"
            help={formik.errors.password}
            validateStatus={formik.errors.password ? 'error' : undefined}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;