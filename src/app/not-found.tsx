import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Product Not Found</h1>
        <p className="mb-4">The product you're looking for doesn't exist.</p>
        <Link 
          href="/products" 
          className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark"
        >
          Browse All Products
        </Link>
      </div>
    </div>
  );
}