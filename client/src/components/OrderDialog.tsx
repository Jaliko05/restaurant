"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Esquema para validación de entrada (acepta string o number)
const inputSchema = z.object({
  userId: z.string().min(1, "El ID del usuario es requerido"),
  products: z
    .array(
      z.object({
        productId: z.string().min(1, "Debe seleccionar un producto"),
        quantity: z
          .union([z.string(), z.number()])
          .transform(Number)
          .refine((val) => !isNaN(val) && val > 0, {
            message: "La cantidad debe ser mayor que 0",
          }),
      })
    )
    .min(1, "Debe agregar al menos un producto"),
});

// Tipo para el formulario (pre-transformación)
type FormInputData = {
  userId: string;
  products: {
    productId: string;
    quantity: string | number;
  }[];
};

interface Product {
  id: string;
  name: string;
  price: number;
}

interface Props {
  onCreated: () => void;
}

export const OrderDialog = ({ onCreated }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormInputData>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      userId: "",
      products: [{ productId: "", quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const selectedProducts = watch("products");

  const URL_SERVER = import.meta.env.VITE_URL_SERVER || "http://localhost:3000";

  const total = selectedProducts.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.productId);
    const quantity =
      typeof item.quantity === "string"
        ? parseInt(item.quantity) || 0
        : item.quantity;
    return acc + (product ? product.price * quantity : 0);
  }, 0);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${URL_SERVER}/api/products/getmany`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      setError("Error al cargar los productos");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  const onSubmit = async (data: FormInputData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const transformedData = {
        userId: data.userId,
        products: data.products.map((product) => ({
          productId: product.productId,
          quantity:
            typeof product.quantity === "string"
              ? parseInt(product.quantity)
              : product.quantity,
        })),
      };

      await axios.post(
        `${URL_SERVER}/api/orders/create`,
        {
          userId: transformedData.userId,
          total,
          products: transformedData.products,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      reset();
      setIsOpen(false);
      onCreated();
    } catch (err) {
      setError("Error al crear la orden");
      console.error("Error creating order:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setError(null);
    reset();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Crear orden
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 id="dialog-title" className="text-xl font-bold">
                Nueva Orden
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">
                  Cargando productos...
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label
                    htmlFor="userId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ID del Usuario
                  </label>
                  <input
                    id="userId"
                    {...register("userId")}
                    placeholder="ID del Usuario"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.userId && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.userId.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Productos
                  </label>

                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-2 mb-2">
                      <div className="flex-1">
                        <select
                          {...register(`products.${index}.productId`)}
                          className="w-full border border-gray-300 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Seleccionar producto</option>
                          {products.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} - ${p.price.toFixed(2)}
                            </option>
                          ))}
                        </select>
                        {errors.products?.[index]?.productId && (
                          <p className="mt-1 text-xs text-red-600">
                            {errors.products[index]?.productId?.message}
                          </p>
                        )}
                      </div>

                      <div className="w-20">
                        <input
                          type="number"
                          {...register(`products.${index}.quantity`)}
                          className="w-full border border-gray-300 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          min={1}
                          placeholder="Cant."
                        />
                        {errors.products?.[index]?.quantity && (
                          <p className="mt-1 text-xs text-red-600">
                            {errors.products[index]?.quantity?.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                        className="text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
                        aria-label="Eliminar producto"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  {errors.products && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.products.message}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => append({ productId: "", quantity: 1 })}
                    className="text-blue-600 hover:text-blue-800 underline text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  >
                    + Agregar producto
                  </button>
                </div>

                <div className="border-t pt-4">
                  <div className="text-right font-semibold text-lg">
                    Total: ${total.toFixed(2)}
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
                  >
                    {isSubmitting && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    )}
                    {isSubmitting ? "Guardando..." : "Guardar orden"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
