import React from 'react';
import Home from './components/Home';
import Password from 'antd/es/input/Password';

const user = {
  firstName: 'Sena',
  lastName: 'Savur',
  age: '24', // YYYY-MM-DD formatında tarih
  gender: 'Kadın',
  address: 'Kapaklı Tekirdağ',
  phone: '5551234'
};

const login = {
  email: 'senasavur@gmail.com',
  password: '123456'
}


const products = [
  {
    key: '1',
    productName: 'Çadır',
    category: 'Kamp',
    dailyPrice: 200,
    hourlyPrice: 50,
    startDate: '2024-07-01',
    endDate: '2024-10-05'
  },
  { key: '2',
    productName: 'Play-station 5',
    category: 'Oyun&Konsol',
    dailyPrice: 300,
    hourlyPrice: 50,
    startDate: '2024-07-03',
    endDate: '2024-10-10'
  }
]; 

/*
const products = [
  {
    key: '1',
    productName: 'Ürün 1',
    category: 'Kategori 1',
    dailyPrice: 100,
    hourlyPrice: 20,
    startDate: '2024-06-01',
    endDate: '2024-06-10'
  },
  {
    key: '2',
    productName: 'Ürün 2',
    category: 'Kategori 2',
    dailyPrice: 150,
    hourlyPrice: 30,
    startDate: '2024-06-05',
    endDate: '2024-06-15'
  }
]; */


localStorage.setItem('userData', JSON.stringify(user));
localStorage.setItem('loginData', JSON.stringify(login));
localStorage.setItem('products', JSON.stringify(products));


const App = () => (
  <div>
    <Home></Home>
  </div>
  
);

export default App;



