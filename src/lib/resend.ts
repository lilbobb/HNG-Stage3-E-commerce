import { Resend } from "resend";
import { Order } from "@/types";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export function createOrderEmailTemplate(order: Order) {
  const itemsHTML = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} × ${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toLocaleString()}</td>
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
            box-shadow: 0 6px 20px rgba(0,0,0,0.08);
            border: 1px solid #E5E5E5;
          }

          .header { 
            background: #D87D4A; /* PRIMARY ACCENT */
            color: white; 
            padding: 40px 20px;
            text-align: center; 
          }

          .section {
            padding: 30px 25px;
            border-bottom: 1px solid #EAEAEA;
          }

          .section h2 {
            margin: 0 0 12px;
            font-size: 20px;
            color: #101010;
            font-weight: 700;
          }

          .order-details table {
            width: 100%;
            border-collapse: collapse;
          }

          .order-details td {
            padding: 10px 0;
            border-bottom: 1px solid #EEE;
            color: #101010;
            font-size: 15px;
          }

          .total-section {
            padding: 30px 25px;
            background: #101010;
            color: white;
            text-align: center;
          }

          .total-section h2 {
            margin-top: 12px;
            font-size: 24px;
          }

          .footer {
            padding: 25px;
            text-align: center;
            color: #6D6D6D;
            font-size: 13px;
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
    console.log("📧 Email would be sent to:", email);
    console.log("📦 Order details:", order);
    return { success: true, devMode: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Audiophile <onboarding@resend.dev>",
      to: email,
      subject: `Order Confirmation #${order.orderNumber} - Audiophile`,
      html: createOrderEmailTemplate(order),
    });

    if (error) {
      console.error("Error sending email:", error);
      throw error;
    }

    console.log("✅ Order confirmation email sent successfully");
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
