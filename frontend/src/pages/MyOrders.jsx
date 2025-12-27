import "./MyOrders.css";
import { useEffect, useState } from "react";
import { GetUserId } from "../data/Check";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = GetUserId();
        if (!userId) throw new Error("User not logged in");

        // 1️⃣ Fetch orders
        const res = await fetch(`/api/orders/userid/${userId}`);
        if (!res.ok) throw new Error("Orders not found");

        const ordersData = await res.json();

        // 2️⃣ Enrich items with product details (SAFE)
        const enrichedOrders = await Promise.all(
          ordersData.map(async (order) => {
            const itemsWithProducts = await Promise.all(
              order.items.map(async (item) => {
                try {
                  const productRes = await fetch(`/api/products/byid`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: item.itemId }),
                  });

                  // ❗ Handle 404 / empty response
                  if (!productRes.ok) {
                    console.warn("Product not found:", item.itemId);
                    return {
                      ...item,
                      name: "Product unavailable",
                      price: 0,
                    };
                  }

                  const product = await productRes.json();

                  return {
                    ...item,
                    name: product.title,
                    price: product.price,
                  };
                } catch (err) {
                  console.error("Product fetch failed:", item.itemId, err);
                  return {
                    ...item,
                    name: "Product unavailable",
                    price: 0,
                  };
                }
              })
            );

            return {
              ...order,
              items: itemsWithProducts,
            };
          })
        );

        setOrders(enrichedOrders);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ⏳ Loading
  if (loading) return <p>Loading orders...</p>;

  // ❌ Error
  if (error) return <p className="error">{error}</p>;

  // 📭 Empty orders
  if (orders.length === 0) return <p>No orders found</p>;

  return (
    <div className="myorders">
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div className="order-card" key={order.orderId}>
          <div className="order-header">
            <p className="order-id">Order #{order.orderId}</p>
            <span className="status Delivered">Delivered</span>
          </div>

          <div className="order-items">
            {order.items.map((item) => (
              <div className="item-row" key={item.itemId}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
