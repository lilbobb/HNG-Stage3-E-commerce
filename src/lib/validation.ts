export const orderEmailTemplate = (order: any) => {
  const itemsHtml = order.items.map((it: any) => `<li>${it.name} x ${it.quantity} — $${it.price * it.quantity}</li>`).join('')
  return `
  <div style="font-family: Arial, sans-serif; padding:24px;">
    <h2>Hi ${order.customer.name},</h2>
    <p>Thanks for your purchase! Here's a summary of your order.</p>

    <h3>Order summary</h3>
    <ul>${itemsHtml}</ul>

    <p><strong>Subtotal:</strong> $${order.totals.subtotal}</p>
    <p><strong>Shipping:</strong> $${order.totals.shipping}</p>
    <p><strong>Taxes:</strong> $${order.totals.taxes}</p>
    <p><strong>Total:</strong> $${order.totals.grandTotal}</p>

    <h3>Shipping</h3>
    <p>${order.shipping.address}, ${order.shipping.city} ${order.shipping.zip}, ${order.shipping.country}</p>

    <p>If you have any questions, reply to this email or visit our support page.</p>

    <p style="margin-top:24px;"><a href="${process.env.NEXT_PUBLIC_BASE_URL || '#'}" style="background:#000;color:#fff;padding:10px 14px;border-radius:6px;text-decoration:none;">View your order</a></p>
  </div>
  `
}
