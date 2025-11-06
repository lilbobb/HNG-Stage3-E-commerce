'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Input from '@/components/ui/Input';
import CartItem from '@/components/cart/CartItem';
import SuccessModal from '@/app/checkout/success/[id]/page';
import { useCartContext } from '@/components/cart/CartContext';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, getTotalPrice } = useCartContext();
  const [paymentMethod, setPaymentMethod] = useState<'e-money' | 'cash'>('e-money');
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const generateOrderNumber = () => {
    return 'ORD-' + Date.now().toString().slice(-6);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    const calculatedTotal = getTotalPrice();
    const shipping = 50;
    const vatAmount = Math.floor(calculatedTotal * 0.2); 
    const grandTotal = calculatedTotal + shipping;
    
    const orderData = {
      orderNumber: generateOrderNumber(),
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totals: {
        subtotal: calculatedTotal,
        shipping: 50,
        taxes: vatAmount, 
        grandTotal: grandTotal,
      },
      customer: {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
      },
      shipping: {
        address: formData.get('address') as string,
        city: formData.get('city') as string,
        zip: formData.get('zipCode') as string, 
        country: formData.get('country') as string,
      },
      paymentMethod: paymentMethod,
      status: 'confirmed',
      createdAt: Date.now(),
    };

    try {
      console.log('Sending order data:', orderData);
      
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const responseText = await response.text();
      console.log('Raw API response:', responseText);
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse JSON response:', responseText);
        throw new Error('Invalid JSON response from server');
      }

      console.log('Parsed API Response:', result);
      console.log('Response status:', response.status);

      if (response.ok) {
        const newOrderNumber = orderData.orderNumber;
        setOrderNumber(newOrderNumber);
        setShowSuccessModal(true);
      } else {
        console.error('Failed to create order. Status:', response.status, 'Error:', result);
        alert(`Failed to create order: ${result.error || result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
  };

  const handleSuccessComplete = () => {
    clearCart();
    setShowSuccessModal(false);
    router.push('/');
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex flex-col bg-lighter">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-lighter">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <button
              onClick={() => router.push('/')}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const calculatedTotal = getTotalPrice();
  const vatAmount = Math.round(calculatedTotal * 0.2);
  const grandTotal = calculatedTotal + 50 + vatAmount;

  return (
    <div className="min-h-screen flex flex-col bg-lighter">
      <Header />
      
      <main className="flex-1 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <button
            onClick={() => router.back()}
            className="text-dark/50 hover:text-primary transition-colors mb-8"
          >
            Go Back
          </button>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-lg p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-8">
                  CHECKOUT
                </h1>

                <div className="mb-8">
                  <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
                    Billing Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input 
                        name="name" 
                        label="Name" 
                        placeholder="Alexei Ward" 
                        required 
                      />
                    </div>
                    <div>
                      <Input 
                        name="email" 
                        label="Email Address" 
                        type="email" 
                        placeholder="alexei@mail.com" 
                        required 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Input 
                        name="phone" 
                        label="Phone Number" 
                        type="tel" 
                        placeholder="+1 202-555-0136" 
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
                    Shipping Info
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Input 
                        name="address" 
                        label="Your Address" 
                        placeholder="1137 Williams Avenue" 
                        required 
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input 
                        name="zipCode" 
                        label="ZIP Code" 
                        placeholder="10001" 
                        required 
                      />
                      <Input 
                        name="city" 
                        label="City" 
                        placeholder="New York" 
                        required 
                      />
                    </div>
                    <div>
                      <Input 
                        name="country" 
                        label="Country" 
                        placeholder="United States" 
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
                    Payment Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-3">Payment Method</label>
                      <div className="space-y-3">
                        <label className="flex items-center gap-4 border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-primary has-[:checked]:border-primary">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="e-money"
                            checked={paymentMethod === 'e-money'}
                            onChange={(e) => setPaymentMethod(e.target.value as 'e-money')}
                            className="w-4 h-4 text-primary"
                          />
                          <span className="font-bold text-sm">e-Money</span>
                        </label>
                        <label className="flex items-center gap-4 border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-primary has-[:checked]:border-primary">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cash"
                            checked={paymentMethod === 'cash'}
                            onChange={(e) => setPaymentMethod(e.target.value as 'cash')}
                            className="w-4 h-4 text-primary"
                          />
                          <span className="font-bold text-sm">Cash on Delivery</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {paymentMethod === 'e-money' && (
                        <>
                          <Input 
                            name="emoneyNumber" 
                            label="e-Money Number" 
                            placeholder="238521993" 
                            required 
                          />
                          <Input 
                            name="emoneyPin" 
                            label="e-Money PIN" 
                            placeholder="6891" 
                            required 
                          />
                        </>
                      )}

                      {paymentMethod === 'cash' && (
                        <div className="flex gap-4 p-4 bg-gray-50 rounded-lg mt-6">
                          <div className="w-12 h-12 flex-shrink-0">
                            <Image 
                              src="/assets/checkout/icon-cash-on-delivery.svg" 
                              alt="Cash on delivery" 
                              width={48}
                              height={48}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <p className="text-sm text-dark/50 leading-relaxed">
                            The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-lg font-bold uppercase tracking-wider mb-6">SUMMARY</h2>
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <CartItem 
                        key={item.id} 
                        item={item} 
                        showQuantityControls={false}
                        compact={true}
                      />
                    ))}
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-dark/50 uppercase text-sm">TOTAL</span>
                      <span className="font-bold text-lg">$ {calculatedTotal.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-dark/50 uppercase text-sm">SHIPPING</span>
                      <span className="font-bold text-lg">$ 50</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-dark/50 uppercase text-sm">VAT (INCLUDED)</span>
                      <span className="font-bold text-lg">$ {vatAmount.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <span className="text-dark/50 uppercase text-sm">GRAND TOTAL</span>
                      <span className="font-bold text-lg text-primary">
                        $ {grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-accent text-white font-bold text-sm tracking-widest uppercase px-8 py-4 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'CONTINUE & PAY'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />

      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={handleModalClose}
        orderNumber={orderNumber}
        onSuccessComplete={handleSuccessComplete}
      />
    </div>
  );
}