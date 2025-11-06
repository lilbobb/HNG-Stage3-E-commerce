import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmation } from '@/lib/nodemailer';
import { Order } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const orderData: Order = await request.json();

    if (!orderData.customer?.email || !orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required order information' },
        { status: 400 }
      );
    }

    await sendOrderConfirmation(orderData.customer.email, orderData);

    return NextResponse.json({ 
      success: true, 
      orderNumber: orderData.orderNumber,
      message: 'Order created and confirmation email sent'
    });

  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    );
  }
}