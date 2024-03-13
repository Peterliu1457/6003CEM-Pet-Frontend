import React from 'react';
import { Form, Input, Select, Button, Typography, Space, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, KeyOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const RegisterPage: React.FC = () => {
  const router = useNavigate();  


  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      role: 'adopt',
      registerCode: '',
    },
    validationSchema: Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        username: Yup.string().required('Username is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Passwords must match')
            .required('Confirm Password is required'),
        registerCode: Yup.string()
            .when('role', {
                is: 'charity',
                then: schema => schema.required('Register code is required')
            })
    }),
    onSubmit: async (values) => {
        try {
            const response = await axios.post(`/api/users/register`, {
                email: values.email,
                username: values.username,
                password: values.password,
                type: values.role,
                register_code: values.registerCode
            });

            // show toast message
            message.success('Account created successfully, please sign in to continue');
            router('/auth/sign-in');
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
          Sign Up
        </Title>
        <div>
            <p>
                Already have an account? <Link to="/auth/sign-in">Sign In</Link>
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
            name="username"
            help={formik.errors.username}
            validateStatus={formik.errors.username ? 'error' : undefined}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              value={formik.values.username}
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
          <Form.Item
            name="confirmPassword"
            help={formik.errors.confirmPassword}
            validateStatus={formik.errors.confirmPassword ? 'error' : undefined}
          >
            <Input.Password
              prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <span>Role:</span>
              <Select
                value={formik.values.role}
                onChange={(value) => formik.setFieldValue('role', value)}
              >
                <Option value="adopt">Adopt</Option>
                <Option value="charity">Charity</Option>
              </Select>
            </Space>
          </Form.Item>
          {formik.values.role === 'charity' && (
            <Form.Item
              name="registerCode"
              help={formik.errors.registerCode}
              validateStatus={formik.errors.registerCode ? 'error' : undefined}
            >
              <Input
                placeholder="Register Code"
                value={formik.values.registerCode}
                onChange={formik.handleChange}
              />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;