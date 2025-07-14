import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "../components/ProductCardProps";
import { ProductDialog } from "../components/ProductDialog";

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

const URL_SERVER = import.meta.env.VITE_URL_SERVER || "http://localhost:3000";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await axios.get(`${URL_SERVER}/api/products/getmany`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProducts(res.data);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Productos</h1>
        <ProductDialog onCreated={fetchProducts} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onUpdated={fetchProducts}
          />
        ))}
      </div>
    </div>
  );
}
