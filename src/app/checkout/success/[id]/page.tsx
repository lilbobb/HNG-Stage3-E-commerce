'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Input from '@/components/ui/Input';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCartContext } from '@/components/cart/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, total, clearCart } = useCartContext();
  const [paymentMethod, setPaymentMethod] = useState<'e-money' | 'cash'>('e-money');
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle redirect when cart is empty
  useEffect(() => {
    if (isClient && (!cart || cart.length === 0)) {
      setShouldRedirect(true);
    }
  }, [isClient, cart]);

  // Perform the actual redirect
  useEffect(() => {
    if (shouldRedirect) {
      router.push('/');
    }
  }, [shouldRedirect, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const orderData = {
      items: cart || [],
      total: total || 0,
      customerInfo: {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
        zipCode: formData.get('zipCode') as string,
        city: formData.get('city') as string,
        country: formData.get('country') as string,
      },
      paymentMethod,
    };

    // Simulate API call
    setTimeout(() => {
      clearCart();
      router.push('/checkout/success/123');
    }, 1000);
  };

  // Show loading while checking cart state
  if (!isClient) {
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

  // Show redirect message
  if (shouldRedirect) {
    return (
      <div className="min-h-screen flex flex-col bg-lighter">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">Redirecting...</div>
        </main>
        <Footer />
      </div>
    );
  }

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
              {/* Checkout Form - Left Side */}
              <div className="lg:col-span-2 bg-white rounded-lg p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-8">
                  CHECKOUT
                </h1>

                {/* Billing Details */}
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

                {/* Shipping Info */}
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

                {/* Payment Details */}
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
                          <span className="text-3xl">💵</span>
                          <p className="text-sm text-dark/50 leading-relaxed">
                            The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary - Right Side */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-lg font-bold uppercase tracking-wider mb-6">SUMMARY</h2>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <CartItem 
                        key={item.id} 
                        item={item} 
                        showQuantityControls={false}
                        compact={true}
                      />
                    ))}
                  </div>
                  
                  {/* Cart Summary */}
                  <CartSummary
                    total={total || 0}
                    showCheckoutButton={false}
                  />

                  {/* Continue & Pay Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-accent text-white font-bold text-sm tracking-widest uppercase px-8 py-4 transition-colors disabled:opacity-50 mt-6"
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
    </div>
  );
}