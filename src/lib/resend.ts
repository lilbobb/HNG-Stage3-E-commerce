import Resend from 'resend'
import { orderEmailTemplate } from './validation'

const resend = new Resend(process.env.RESEND_API_KEY || '')

export async function sendOrderConfirmation(email: string, order: any) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY missing — skipping email send (dev mode)')
    return
  }
  await resend.emails.send({
    from: 'Audiophile <orders@yourdomain.com>',
    to: email,
    subject: `Your Audiophile order — ${new Date().toISOString().slice(0,19)}`,
    html: orderEmailTemplate(order)
  })
}
