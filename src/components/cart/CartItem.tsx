'use client';

import React from 'react';
import Image from 'next/image';
import { useCartContext } from '@/components/cart/CartContext';
import QuantitySelector from '@/components/ui/QuantitySelector';
import type { CartItem as CartItemType } from '@/components/cart/CartContext';

interface CartItemProps {
  item: CartItemType;
  showQuantityControls?: boolean;
  compact?: boolean;
}

export default function CartItem({ item, showQuantityControls = true, compact = false }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartContext();

  return (
    <div className={`flex items-center gap-4 ${compact ? 'p-0' : 'p-4'} bg-white rounded-lg`}>
      {/* Product Image */}
      <div className={`relative ${compact ? 'w-16 h-16' : 'w-20 h-20'} rounded-lg overflow-hidden bg-light flex-shrink-0`}>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-dark/20 text-xs">
            Image
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-bold ${compact ? 'text-sm' : 'text-base'} uppercase truncate text-dark`}>
          {item.name}
        </h3>
        <p className={`${compact ? 'text-sm' : 'text-base'} text-dark font-bold`}>
          $ {item.price.toLocaleString()}
        </p>
      </div>

      {/* Quantity Controls */}
      {showQuantityControls ? (
        <div className="flex items-center gap-3 text-dark">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
            onDecrease={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            compact
          />
        </div>
      ) : (
        <span className="text-dark/50 font-bold text-sm">x{item.quantity}</span>
      )}
    </div>
  );
}