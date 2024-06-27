import React, { useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import './Users.css';

const { Option } = Select;

const Users = () => {
  const [form] = Form.useForm();

  // Sayfa yüklendiğinde local storage'den verileri alıp formu doldurma
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      form.setFieldsValue({
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: userData.age,
        gender: userData.gender,
        address: userData.address,
        phone: userData.phone,
      });
    }
  }, [form]);

  const onFinish = (values) => {
    console.log('Form Değerleri:', values);

    // Form değerlerini local storage'e kaydetme
    localStorage.setItem('userData', JSON.stringify(values));
    message.success('Bilgileriniz başarıyla kaydedildi!');

    // Form nesnesini güncelleyerek inputları temizleme
    form.setFieldsValue(values); // Bu satırı ekleyin veya güncelleyin
  };

  return (
    <div className='new-users'>
      <h1>PROFİL BİLGİLERİ</h1>
      <div className='hr'>
        <hr></hr>
      </div>
      <br></br>
      <Form
        form={form}
        name="userForm"
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 600, margin: '0 auto' }}
      >
        <Form.Item
          name="firstName" // Bu isimlerin values içindekilerle uyumlu olduğundan emin olun
          label="Ad"
          rules={[{ required: true, message: 'Lütfen adınızı girin!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Soyad"
          rules={[{ required: true, message: 'Lütfen soyadınızı girin!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="age"
          label="Yaş"
          rules={[{ required: true, message: 'Lütfen yaşınızı girin!' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Cinsiyet"
          rules={[{ required: true, message: 'Lütfen cinsiyetinizi seçin!' }]}
        >
          <Select placeholder="Cinsiyetinizi seçin">
            <Option value="male">Erkek</Option>
            <Option value="female">Kadın</Option>
            <Option value="other">Diğer</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="address"
          label="Adres"
          rules={[{ required: true, message: 'Lütfen adresinizi girin!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Telefon Numarası"
          rules={[{ required: true, message: 'Lütfen telefon numaranızı girin!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button className='button-class' type="primary" htmlType="submit">
            KAYDET
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Users;



