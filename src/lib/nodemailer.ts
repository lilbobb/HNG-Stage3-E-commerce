import nodemailer from "nodemailer";
import { Order } from "@/types";

const createTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

export function createOrderEmailTemplate(order: Order) {
  const itemsHTML = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #444; color: white;">${item.name} × ${item.quantity}</td>
      <td style="padding: 12px 0; border-bottom: 1px solid #444; text-align: right; color: white;">$${(item.price * item.quantity).toLocaleString()}</td>
    </tr>
  `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
          font-family: Arial, sans-serif;
          background: #F1F1F1;
          margin: 0;
          padding: 40px 0;
        }
          .container { 
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          overflow: hidden;
        }
          .header {
          background: #D87D4A;
          color: white;
          padding: 40px 20px;
          text-align: center;
        }
          .section {
          padding: 30px 25px;
          border-bottom: 1px solid #EAEAEA;
        }
          .section h2 {
          margin: 0 0 16px 0;
          font-size: 20px;
          color: #101010;
        }
          .customer-info p {
          margin: 8px 0;
          color: #6D6D6D;
        }
          .total-section {
          padding: 30px 25px;
          background: #101010;
          color: white;
        }
          .total-section table {
          width: 100%;
          border-collapse: collapse;
        }
          .total-section td {
          padding: 12px 0;
          border-bottom: 1px solid #444;
        }
          .footer {
          padding: 25px;
          text-align: center;
          color: #6D6D6D;
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
          
          <div class="section customer-info">
            <h2>Shipping Information</h2>
            <p><strong>${order.customer.name}</strong></p>
            <p>${order.shipping.address}</p>
            <p>${order.shipping.city}, ${order.shipping.country} ${order.shipping.zip}</p>
            <p>📞 ${order.customer.phone}</p>
            <p>📧 ${order.customer.email}</p>
          </div>
          
          <div class="total-section">
            <h2>Order Summary</h2>
            <table>${itemsHTML}</table>
            <h3>Shipping: $${order.totals.shipping.toLocaleString()}</h3>
            <h3>Taxes: $${order.totals.taxes.toLocaleString()}</h3>
            <h2 style="color: #D87D4A; margin-top: 16px;">Grand Total: $${order.totals.grandTotal.toLocaleString()}</h2>
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
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return { success: true, demoMode: true };
  }

  try {
    const transporter = createTransporter();
    const result = await transporter.sendMail({
      from: `Audiophile <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Order Confirmation #${order.orderNumber} - Audiophile`,
      html: createOrderEmailTemplate(order),
    });
    return { success: true, data: result };
  } catch (error) {
    throw error;
  }
}
