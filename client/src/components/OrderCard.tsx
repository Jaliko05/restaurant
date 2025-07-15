import axios from "axios";

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

interface Props {
  order: Order;
  onUpdated: () => void;
}

const URL_SERVER = import.meta.env.VITE_URL_SERVER || "http://localhost:3000";

export const OrderCard = ({ order, onUpdated }: Props) => {
  const handleStatusChange = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    await axios.put(
      `${URL_SERVER}/api/orders/status/${order.id}`,
      { status: "DELIVERED" },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    onUpdated();
  };

  return (
    <div className="border rounded-lg p-4 shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Orden #{order.id.slice(0, 8)}</h2>
        <span className="text-sm text-gray-600">
          {new Date(order.createdAt).toLocaleString()}
        </span>
      </div>

      <p className="text-sm mb-2">
        Estado: <span className="font-semibold">{order.orderStatus}</span>
      </p>

      <div className="divide-y divide-gray-200 mb-4">
        {order.productOrders.map((po) => (
          <div key={po.id} className="py-2 flex justify-between">
            <div>
              <p className="font-medium">{po.product.name}</p>
              <p className="text-sm text-gray-500">Cantidad: {po.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-right">
              ${(po.product.price * po.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-right font-bold text-green-700">
          Total: ${order.total.toFixed(2)}
        </p>
        {order.orderStatus !== "DELIVERED" && (
          <button
            onClick={handleStatusChange}
            className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm"
          >
            Marcar como entregada
          </button>
        )}
      </div>
    </div>
  );
};
