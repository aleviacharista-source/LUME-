import React from 'react';
import { CheckoutForm } from '../components/CheckoutForm';

export const Checkout: React.FC = () => {
  return (
    <div className="bg-[#F7F4EF] min-h-screen py-10">
      <CheckoutForm />
    </div>
  );
};

export default Checkout;
