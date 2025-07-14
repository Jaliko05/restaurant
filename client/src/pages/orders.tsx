import { useEffect, useState } from "react";
import axios from "axios";
import { OrderCard } from "../components/OrderCard";
import { OrderDialog } from "../components/OrderDialog";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductOrder {
  id: string;
  product: Product;
  quantity: number;
}

interface Order {
  id: string;
  total: number;
  orderStatus: string;
  createdAt: string;
  productOrders: ProductOrder[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const URL_SERVER = import.meta.env.VITE_URL_SERVER || "http://localhost:3000";

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No se encontró el token de autenticación");
        setLoading(false);
        return;
      }

      const res = await axios.get(`${URL_SERVER}/api/orders/getmany`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Validar que la respuesta sea un array
      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else {
        console.error("La respuesta no es un array:", res.data);
        setError("Error en el formato de datos recibidos");
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Error al cargar las órdenes");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Asegurar que orders sea un array antes de usar filter
  const safeOrders = Array.isArray(orders) ? orders : [];

  const openOrders = safeOrders.filter(
    (o) => o.orderStatus !== "DELIVERED" && o.orderStatus !== "CANCELLED"
  );

  const closedOrders = safeOrders.filter(
    (o) => o.orderStatus === "DELIVERED" || o.orderStatus === "CANCELLED"
  );

  if (loading) {
    return (
      <div className="p-4 max-w-6xl mx-auto">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg text-gray-600">
            Cargando órdenes...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-6xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Órdenes</h1>
        <OrderDialog onCreated={fetchOrders} />
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Órdenes Abiertas ({openOrders.length})
        </h2>
        <div className="space-y-6">
          {openOrders.length > 0 ? (
            openOrders.map((order) => (
              <OrderCard key={order.id} order={order} onUpdated={fetchOrders} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No hay órdenes abiertas</p>
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">
          Órdenes Cerradas ({closedOrders.length})
        </h2>
        <div className="space-y-6">
          {closedOrders.length > 0 ? (
            closedOrders.map((order) => (
              <OrderCard key={order.id} order={order} onUpdated={fetchOrders} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No hay órdenes cerradas</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
