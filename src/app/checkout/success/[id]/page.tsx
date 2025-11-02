'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartContext } from '@/components/cart/CartContext';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  onSuccessComplete: () => void;
}

export default function SuccessModal({ isOpen, onClose, orderNumber, onSuccessComplete }: SuccessModalProps) {
  const { items, getTotalPrice } = useCartContext();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = getTotalPrice();
  const shipping = 50;
  const vat = Math.floor(subtotal * 0.2);
  const grandTotal = subtotal + shipping;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4">
        <div className="bg-white rounded-lg p-6 md:p-8 max-h-[90vh] overflow-y-auto">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">✓</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4">
              THANK YOU
              <br />
              FOR YOUR ORDER
            </h2>
            <p className="text-dark/75">
              You will receive an email confirmation shortly.
            </p>
            <p className="text-sm text-dark/50 mt-2">Order #: {orderNumber}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg overflow-hidden mb-8">
            <div className="bg-gray-100 p-6">
              <div className="space-y-4">
                {items.slice(0, 1).map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-lg overflow-hidden">
                        <Image
                          src={item.image || '/assets/placeholder.jpg'}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{item.name}</h4>
                        <p className="text-sm text-dark/50">${item.price}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-dark/50">x{item.quantity}</span>
                  </div>
                ))}
              </div>

              {items.length > 1 && (
                <div className="pt-4 border-t border-gray-300 mt-4">
                  <p className="text-center text-sm text-dark/50">
                    and {items.length - 1} other item(s)
                  </p>
                </div>
              )}
            </div>

            <div className="bg-dark text-white p-6 flex flex-col justify-center">
              <div className="space-y-2">
                <p className="text-white/75 uppercase text-sm">Grand Total</p>
                <p className="text-lg font-bold">${grandTotal.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="w-full bg-primary hover:bg-accent text-white font-bold text-sm tracking-widest uppercase px-8 py-4 transition-colors text-center block"
            onClick={onSuccessComplete}
          >
            BACK TO HOME
          </Link>
        </div>
      </div>
    </>
  );
}