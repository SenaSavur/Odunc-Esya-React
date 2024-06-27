import React, { useState, useEffect } from 'react';
import { Input, Card, Row, Col, Button, DatePicker, TimePicker, Modal, Select } from 'antd';
import PaymentInfo from './PaymentInfo';
import dayjs from 'dayjs';
import './Products.css';

const { Option } = Select;

const Products = () => {
  const [filters, setFilters] = useState({ productName: '', startDate: null, endDate: null });
  const [filteredData, setFilteredData] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    category: '',
    dailyPrice: '',
    hourlyPrice: '',
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    setFilteredData(products);
  }, []);

  const handleConfirm = () => setShowInvoiceModal(true);

  const handleSearch = () => {
    const { productName, startDate, endDate } = filters;
    const products = JSON.parse(localStorage.getItem('products')) || [];
  
    const start = startDate ? dayjs(startDate) : null;
    const end = endDate ? dayjs(endDate) : null;
  
    const filteredResult = products.filter(item => {
      const itemStartDate = dayjs(item.startDate);
      const itemEndDate = dayjs(item.endDate);
  
      const isProductNameMatch = !productName || item.productName.toLowerCase().includes(productName.toLowerCase());
  
      // Tarih karşılaştırmalarını manuel yaptım
      const isWithinDateRange = (!start || itemStartDate.isAfter(start) || itemStartDate.isSame(start)) &&
                                (!end || itemEndDate.isBefore(end) || itemEndDate.isSame(end));
  
      return isProductNameMatch && isWithinDateRange;
    });
  
    setFilteredData(filteredResult);
  };
  

  const updateFilter = (key, value) => setFilters({ ...filters, [key]: value });

  const resetFilters = () => {
    setFilters({ productName: '', startDate: null, endDate: null });
    const products = JSON.parse(localStorage.getItem('products')) || [];
    setFilteredData(products);
  };

  const addToCart = (item) => setCart([...cart, { ...item, selectedStartDate: null, selectedEndDate: null, selectedStartTime: null, selectedEndTime: null, calculatedPrice: 0, rentalType: 'daily' }]);

  const updateCartDate = (key, value, index) => {
    const newCart = [...cart];
    newCart[index][key] = value;
    setCart(newCart);
  };

  const updateRentalType = (value, index) => {
    const newCart = [...cart];
    newCart[index].rentalType = value;
    setCart(newCart);
  };

  const calculatePrice = (index) => {
    const item = cart[index];
    if (item.rentalType === 'daily' && item.selectedStartDate && item.selectedEndDate) {
      const days = item.selectedEndDate.diff(item.selectedStartDate, 'day') + 1;
      const calculatedPrice = days * item.dailyPrice;
      const newCart = [...cart];
      newCart[index].calculatedPrice = calculatedPrice;
      setCart(newCart);
      calculateTotal();
    } else if (item.rentalType === 'hourly' && item.selectedStartTime && item.selectedEndTime) {
      const hours = item.selectedEndTime.diff(item.selectedStartTime, 'hour');
      const calculatedPrice = hours * item.hourlyPrice;



      const newCart = [...cart];
      newCart[index].calculatedPrice = calculatedPrice;
      setCart(newCart);
      calculateTotal();
    }
  };

  const calculateTotal = () => setTotalPrice(cart.reduce((acc, item) => acc + item.calculatedPrice, 0));

  const handlePaymentSubmit = (paymentData) => {
    console.log('Ödeme Verileri:', paymentData);
    setCart([]);
    setShowPaymentForm(false);
  };

  const handleAddProduct = () => setIsModalVisible(true);

  const handleModalOk = () => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const newProducts = [...products, { ...newProduct, key: Date.now() }];
    localStorage.setItem('products', JSON.stringify(newProducts));
    setFilteredData(newProducts);
    setNewProduct({
      productName: '',
      category: '',
      dailyPrice: '',
      hourlyPrice: '',
      startDate: null,
      endDate: null,
    });
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setNewProduct({
      productName: '',
      category: '',
      dailyPrice: '',
      hourlyPrice: '',
      startDate: null,
      endDate: null,
    });
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleDeleteProduct = (key) => {
    const updatedProducts = filteredData.filter(item => item.key !== key);
    setFilteredData(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <div className="products-container">
      <div className="top-buttons">
        <Button type="primary" onClick={handleAddProduct} className='buton'>Ürün Ekle</Button>
      </div>
      <Row gutter={[16, 16]}>
        {['productName', 'startDate', 'endDate'].map((key) => (
          <Col key={key} xs={24} sm={12} md={8} lg={6}>
            {key === 'productName' ? (
              <Input placeholder="Ürün adıyla filtrele" value={filters.productName} onChange={(e) => updateFilter(key, e.target.value)} />
            ) : (
              <DatePicker placeholder={key === 'startDate' ? 'Başlangıç Tarihi' : 'Bitiş Tarihi'} value={filters[key]} onChange={(date) => updateFilter(key, date)} className="date-picker" />
            )}
          </Col>
        ))}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Button type="primary" onClick={handleSearch} className='buton'>Ara</Button>
          <br></br>
          <br></br>
          <Button onClick={resetFilters} className='buton'>Sıfırla</Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="products-grid">
        {filteredData.map((item) => (
          <Col key={item.key} xs={24} sm={12} md={8} lg={6}>
            <Card title={item.productName}>
              <p>Kategori: {item.category}</p>
              <p>Günlük Fiyat: {item.dailyPrice} TL/gün</p>
              <p>Saatlik Fiyat: {item.hourlyPrice} TL/saat</p>
              <p>Başlangıç Tarihi: {dayjs(item.startDate).format('YYYY-MM-DD')}</p>
              <p>Bitiş Tarihi: {dayjs(item.endDate).format('YYYY-MM-DD')}</p>
              <Button type="primary" onClick={() => addToCart(item)} className='buton'>Ekle</Button>
              <Button type="primary" onClick={() => handleDeleteProduct(item.key)} className='remove-buton'>-</Button>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="cart-container">
        <Card title="Sepetim" className="cart-card">
          {cart.map((item, index) => (
            <div key={item.key} className="cart-item">
              <p>{item.productName}</p>
              <Select
                value={item.rentalType}
                onChange={(value) => updateRentalType(value, index)}
                className="rental-type-select"
              >
                <Option value="daily">Günlük</Option>
                <Option value="hourly">Saatlik</Option>
              </Select>
              {item.rentalType === 'daily' ? (
                <>
                  <DatePicker placeholder="Başlangıç Tarihi" value={item.selectedStartDate} onChange={(date) => updateCartDate('selectedStartDate', date, index)} className="date-picker" />
                  <DatePicker placeholder="Bitiş Tarihi" value={item.selectedEndDate} onChange={(date) => updateCartDate('selectedEndDate', date, index)} className="date-picker" />
                </>
              ) : (
                <>
                  <TimePicker placeholder="Başlangıç Saati" value={item.selectedStartTime} onChange={(time) => updateCartDate('selectedStartTime', time, index)} className="time-picker" format="HH:mm" />
                  <TimePicker placeholder="Bitiş Saati" value={item.selectedEndTime} onChange={(time) => updateCartDate('selectedEndTime', time, index)} className="time-picker" format="HH:mm" />
                </>
              )}
              <Button type="primary" onClick={() => calculatePrice(index)} className='buton'>Fiyatı Hesapla</Button>
              <p>Hesaplanan Fiyat: {item.calculatedPrice} TL</p>
            </div>
          ))}
          <p>Toplam Fiyat: {totalPrice} TL</p>
          <Button type="primary" onClick={() => setShowPaymentForm(true)} className='buton'>Ödeme Yap</Button>
          {showPaymentForm && (
            <>
              <PaymentInfo onSubmit={handlePaymentSubmit} />
              <Button type="primary" onClick={handleConfirm} className='buton'>Onayla</Button>
            </>
          )}
        </Card>
      </div>
      <Modal visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
        <Input placeholder="Ürün Adı" name="productName" value={newProduct.productName} onChange={handleInputChange} />
        <Input placeholder="Kategori" name="category" value={newProduct.category} onChange={handleInputChange} />
        <Input placeholder="Günlük Fiyat" name="dailyPrice" value={newProduct.dailyPrice} onChange={handleInputChange} />
        <Input placeholder="Saatlik Fiyat" name="hourlyPrice" value={newProduct.hourlyPrice} onChange={handleInputChange} />
        <DatePicker placeholder="Başlangıç Tarihi" value={newProduct.startDate} onChange={(date) => setNewProduct({ ...newProduct, startDate: date })} className="date-picker" />
        <DatePicker placeholder="Bitiş Tarihi" value={newProduct.endDate} onChange={(date) => setNewProduct({ ...newProduct, endDate: date })} className="date-picker" />
      </Modal>
      <Modal visible={showInvoiceModal} onCancel={() => setShowInvoiceModal(false)} footer={null}>
        <h2>Fatura Detayları</h2>
        {cart.map((item) => (
          <p key={item.key}>{item.productName} - {item.calculatedPrice} TL</p>
        ))}
        <p>Toplam Fiyat: {totalPrice} TL</p>
        <h4>Faturanız email adresinize gönderildi.</h4>
      </Modal>
    </div>
  );
};

export default Products;
