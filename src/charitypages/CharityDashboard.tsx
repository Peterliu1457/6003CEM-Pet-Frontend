import React, { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppstoreOutlined, LogoutOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Header, Content, Sider } = Layout;

function CharityDashboard() {
    const { logout } = useAuth();
    const router = useNavigate();
    const location = useLocation();
    const [selectedMenu, setSelectedMenu] = React.useState<string>('dogs');

    const handleChange = (e: any) => {
        if (e.key === 'logout') {
            logout();
            router('/auth/sign-in');
        } else {
            router(`/charity/${e.key}`);
        }
    }

    useEffect(() => {
        const pathname: string = location.pathname;
        if (pathname.includes('dogs')) {
            setSelectedMenu('dogs');
        } else if (pathname.includes('upload-dog')) {
            setSelectedMenu('upload-dog');
        } else if (pathname.includes('applications')) {
            setSelectedMenu('applications');
        }
    }, [location]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible>
                <Menu 
                    onClick={handleChange}
                    theme="dark"  
                    selectedKeys={[selectedMenu]}
                    mode="inline">
                    <Menu.Item key="dogs" icon={<UserOutlined />}>
                        Dogs
                    </Menu.Item>
                    <Menu.Item key="upload-dog" icon={<UploadOutlined/>}>
                        Upload Dog
                    </Menu.Item>
                    <Menu.Item key="applications" icon={<AppstoreOutlined />}>
                        Applications
                    </Menu.Item>
                    <Menu.Item key="logout" icon={<LogoutOutlined />}>
                        Logout
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content style={{ margin: '16px' }}>
                    <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default CharityDashboard;