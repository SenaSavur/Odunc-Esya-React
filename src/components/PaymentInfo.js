import React, { useState } from 'react';
import { Input } from 'antd';

const PaymentInfo = ({ onPaymentSubmit }) => {
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCVV] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // Validate and process payment here
    const paymentData = {
      cardholderName,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      email,
    };
    // Pass the payment data to the parent component
    onPaymentSubmit(paymentData);
  };

  return (
    <div>
      <Input
        placeholder="Ad Soyad"
        value={cardholderName}
        onChange={(e) => setCardholderName(e.target.value)}
      />
      <Input
        placeholder="Kart Numarası"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <Input.Group compact>
        <Input
          style={{ width: '50%' }}
          placeholder="Ay"
          value={expiryMonth}
          onChange={(e) => setExpiryMonth(e.target.value)}
        />
        <Input
          style={{ width: '50%' }}
          placeholder="Yıl"
          value={expiryYear}
          onChange={(e) => setExpiryYear(e.target.value)}
        />
      </Input.Group>
      <Input
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCVV(e.target.value)}
      />
      <br></br>
      <br></br>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
};

export default PaymentInfo;

