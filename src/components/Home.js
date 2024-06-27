import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, ShoppingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import Products from './Products';
import Users from './Users';
import './Home.css'; // Yeni eklenen CSS dosyası

const { Header, Sider, Content } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('2');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: '2',
      icon: <ShoppingOutlined />,
      label: 'Ürünler',
    },
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Profilim',
    },
  ];

  const handleMenuClick = ({ key }) => {
    setSelectedMenu(key);
  };

  const navigateToLogin = () => {
    // Burada tıklama işlemi ile ilgili yönlendirme yapılacak
    console.log('Çıkış yap butonuna tıklandı, login sayfasına yönlendirme yapılacak.');
    // Örnek olarak, '/login' gibi bir sayfa yoluna yönlendirme yapabilirsiniz.
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          className='menu-design'
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['2']}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header className="header">
          <div className="header-content">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="menu-button"
            />
            <Button type="text" className="logout-button" onClick={navigateToLogin}>
              <LogoutOutlined /> Çıkış Yap
            </Button>
          </div>
        </Header>
        <Content className="content">
          {selectedMenu === '2' && <Products />}
          {selectedMenu === '1' && <Users />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
