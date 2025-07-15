import { useState } from "react";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface Props {
  product: Product;
  onUpdated?: () => void;
}

const URL_SERVER = import.meta.env.VITE_URL_SERVER || "http://localhost:3000";

export const ProductCard = ({ product, onUpdated }: Props) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [description, setDescription] = useState(product.description || "");

  const handleUpdate = async () => {
    await axios.put(`${URL_SERVER}/api/products/${product.id}`, {
      name,
      price: parseFloat(price),
      description,
    });
    setEditing(false);
    onUpdated?.();
  };

  const handleDelete = async () => {
    await axios.delete(`${URL_SERVER}/api/products/delete/${product.id}`);
    onUpdated?.();
  };

  return (
    <div className="border rounded p-4 shadow space-y-2">
      {editing ? (
        <div className="space-y-2">
          <input
            className="w-full border px-2 py-1 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full border px-2 py-1 rounded"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            className="w-full border px-2 py-1 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-between mt-2">
            <button
              onClick={handleUpdate}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Guardar
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="text-emerald-600 font-semibold">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setEditing(true)}
              className="text-blue-600 hover:underline"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:underline"
            >
              Eliminar
            </button>
          </div>
        </>
      )}
    </div>
  );
};
