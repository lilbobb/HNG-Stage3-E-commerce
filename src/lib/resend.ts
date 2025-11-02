import { Resend } from 'resend';
import { Order } from '@/types'; 

const resend = new Resend(process.env.RESEND_API_KEY || '');

export function createOrderEmailTemplate(order: Order) {
  const itemsHTML = order.items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} × ${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toLocaleString()}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
          }
          .header { 
            background: #0E0E0E; 
            color: white; 
            padding: 30px; 
            text-align: center; 
          }
          .order-details { 
            background: #f9f9f9; 
            padding: 20px; 
            margin: 20px 0; 
            border-radius: 8px;
          }
          .total-section { 
            background: #0E0E0E; 
            color: white; 
            padding: 20px; 
            text-align: center; 
            border-radius: 8px;
            margin: 20px 0;
          }
          .customer-info {
            background: white;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #eee;
            margin: 20px 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎧 Thank you for your order!</h1>
            <p>Your Audiophile order has been confirmed</p>
            <p><strong>Order #: ${order.orderNumber}</strong></p>
          </div>
          
          <div class="customer-info">
            <h2>Shipping Information</h2>
            <p><strong>${order.customer.name}</strong></p>
            <p>${order.shipping.address}</p>
            <p>${order.shipping.city}, ${order.shipping.country} ${order.shipping.zip}</p>
            <p>📞 ${order.customer.phone}</p>
            <p>📧 ${order.customer.email}</p>
          </div>
          
          <div class="order-details">
            <h2>Order Summary</h2>
            <table>
              ${itemsHTML}
            </table>
          </div>
          
          <div class="total-section">
            <h3>Shipping: $${order.totals.shipping.toLocaleString()}</h3>
            <h3>Taxes: $${order.totals.taxes.toLocaleString()}</h3>
            <h2>Grand Total: $${order.totals.grandTotal.toLocaleString()}</h2>
          </div>
          
          <div class="footer">
            <p>We'll send you a shipping confirmation when your order ships.</p>
            <p>If you have any questions, please contact our support team.</p>
            <p>© 2024 Audiophile. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function sendOrderConfirmation(email: string, order: Order) {
  if (!process.env.RESEND_API_KEY) {
    console.log('📧 Email would be sent to:', email);
    console.log('📦 Order details:', order);
    return { success: true, devMode: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Audiophile <onboarding@resend.dev>',
      to: email,
      subject: `Order Confirmation #${order.orderNumber} - Audiophile`,
      html: createOrderEmailTemplate(order),
    });

    if (error) {
      console.error('Error sending email:', error);
      throw error;
    }

    console.log('✅ Order confirmation email sent successfully');
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}