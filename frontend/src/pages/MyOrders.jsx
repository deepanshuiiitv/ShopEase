import "./MyOrders.css";
import { useEffect, useState } from "react";
import { GetUserId } from "../data/Check";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = GetUserId();

        // 1️⃣ Fetch orders by userId
        const res = await fetch(`/api/orders/userid/${userId}`);
        if (!res.ok) throw new Error("Orders not found");

        const ordersData = await res.json();
        console.log("Orders received:", ordersData);

        // 2️⃣ Fetch product details for each itemId
        const enrichedOrders = await Promise.all(
          ordersData.map(async (order) => {
            const itemsWithNames = await Promise.all(
              order.items.map(async (item) => {
                console.log("Item before fetch:", item);
                const productRes = await fetch(`/api/products/byid`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ id: item.itemId.toString() }),
                });

                const product = await productRes.json();
                console.log("product  fetch:", product);


                return {
                  ...item,
                  name: product.title,
                  price: product.price,
                };
              })
            );

            return {
              ...order,
              items: itemsWithNames,
            };
          })
        );

        setOrders(enrichedOrders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

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
            {order.items.map((item, i) => (
              <div className="item-row" key={i}>
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
