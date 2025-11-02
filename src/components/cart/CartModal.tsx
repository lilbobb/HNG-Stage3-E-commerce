'use client';

import { useCartContext } from '@/components/cart/CartContext';
import Button from '@/components/ui/Button';
import CartItem from '@/components/cart/CartItem';
import { useRouter } from 'next/navigation';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const router = useRouter();
  const { items, clearCart, getTotalPrice } = useCartContext();
  const total = getTotalPrice();

  const handleCheckout = () => {
    console.log('Checkout clicked, items:', items);
    console.log('Navigating to checkout...');
    onClose();
    router.push('/checkout');
  };

  if (!isOpen) return null; 

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed top-24 right-6 lg:right-24 w-full max-w-[377px] bg-white rounded-lg z-50 max-h-[488px] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold uppercase tracking-wider text-dark">
            CART ({items.length})
          </h3>
          <button
            onClick={clearCart}
            className="text-dark/50 hover:text-primary underline text-sm transition-colors"
          >
            Remove all
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-dark/50">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  compact={true}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer with Total and Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <span className="text-dark uppercase text-sm font-medium">TOTAL</span>
              <span className="font-bold text-lg text-dark">$ {total.toLocaleString()}</span>
            </div>
            
            <Button
              variant="primary"
              fullWidth
              onClick={handleCheckout}
            >
              CHECKOUT
            </Button>
          </div>
        )}
      </div>
    </>
  );
}