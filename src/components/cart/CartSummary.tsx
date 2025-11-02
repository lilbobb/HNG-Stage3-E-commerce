'use client';

import React from 'react';
import Button from '@/components/ui/Button';

interface CartSummaryProps {
  total: number;
  shipping?: number;
  vat?: number;
  showCheckoutButton?: boolean;
  onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  total,
  shipping = 50,
  vat,
  showCheckoutButton = true,
  onCheckout,
}) => {
  const calculatedVat = vat ?? total * 0.2; 
  const grandTotal = total + shipping + calculatedVat;

  return (
    <div className="bg-white rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-bold uppercase tracking-wider">Summary</h2>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-dark/50 uppercase text-sm">Total</span>
          <span className="font-bold text-lg">$ {total.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-dark/50 uppercase text-sm">Shipping</span>
          <span className="font-bold text-lg">$ {shipping}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-dark/50 uppercase text-sm">VAT (Included)</span>
          <span className="font-bold text-lg">$ {Math.round(calculatedVat).toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center pt-4">
          <span className="text-dark/50 uppercase text-sm">Grand Total</span>
          <span className="font-bold text-lg text-primary">
            $ {Math.round(grandTotal).toLocaleString()}
          </span>
        </div>
      </div>

      {showCheckoutButton && (
        <Button
          variant="primary"
          fullWidth
          onClick={onCheckout}
        >
          Continue & Pay
        </Button>
      )}
    </div>
  );
};

export default CartSummary;