"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import axios from "axios";

const productSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Debe ser un número válido",
  }),
  description: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductDialogProps {
  onCreated: () => void;
}

const URL_SERVER = import.meta.env.VITE_URL_SERVER || "http://localhost:3000";

export const ProductDialog = ({ onCreated }: ProductDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormData) => {
    await axios.post(`${URL_SERVER}/api/products/create`, {
      name: data.name,
      price: parseFloat(data.price),
      description: data.description,
    });
    reset();
    setIsOpen(false);
    onCreated();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Agregar producto
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Nuevo Producto</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  {...register("name")}
                  placeholder="Nombre"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  {...register("price")}
                  placeholder="Precio"
                  type="number"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  {...register("description")}
                  placeholder="Descripción (opcional)"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    reset();
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
