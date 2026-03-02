import { ProductForm } from '../ProductForm';

export default function NewProductPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="font-display text-3xl">Add Product</h1>
        <p className="text-cream/40 text-sm mt-1">Create a new product listing</p>
      </div>
      <ProductForm />
    </div>
  );
}
