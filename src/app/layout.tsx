import "@/styles/globals.css";
import { CartProvider } from "@/components/cart/CartContext";
import { ConvexClientProvider } from "@/components/providers/ConvexProvider";

export const metadata = {
  title: "Audiophile | Premium Audio Equipment",
  description: "Experience natural, lifelike audio with our premium headphones, speakers, and earphones.",
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ConvexClientProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}