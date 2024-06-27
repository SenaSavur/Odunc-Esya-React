import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './Login.css';
import loginImage from '../assets/logo.png';

class Logins extends React.Component {
  onFinish = (values) => {
    const { email, password } = values;

    // localStorage'den kaydedilen login bilgilerini alma
    const storedLogin = JSON.parse(localStorage.getItem('loginData'));

    if (storedLogin && email === storedLogin.email && password === storedLogin.password) {
      console.log('Giriş başarılı:', { email, password });
      message.success('Giriş başarılı!');
    } else {
      console.error('Giriş başarısız:', { email, password });
      message.error('Giriş başarısız! Email veya şifre yanlış.');
    }
  };

  render() {
    return (
      <div className="container">
        <div className="image-section">
          <img src={loginImage} alt="Login Image" />
        </div>
        <div className="login-section">
          <div className="login-box">
            <div className="logo">ÖDÜNÇ APP</div>
            <hr />
            <br />
            <p>Hoşgeldiniz!</p>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
              style={{ display: 'block' }}
            >
              <Form.Item
                name="email"
                rules={[
                  { 
                    type: 'email', 
                    message: 'Geçerli bir email adresi giriniz!' 
                  },
                  { 
                    required: true, 
                    message: 'Lütfen email adresinizi giriniz!' 
                  }
                ]}
              >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Lütfen şifrenizi giriniz!' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Şifre"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Beni Hatırla</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="">
                  Şifremi Unuttum
                </a>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  GİRİŞ
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Logins;






