import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import OrdersTable from "../../components/Orders/OrdersTable";
import "../Admin/admin.css";

const formatOrderForTable = (order) => ({
  id: order.id,
  userId: order.kupacId,
  dateCreated: order.datumKreirana,
  dateSent: order.datumPoslata,
  status: order.status,
  totalAmount: Number(order.ukupniIznos) || 0,
  orderItems: (order?.stavkePorudzbine || order?.stavke_porudzbine || []).map((item) => ({
    number: item.rb,
    productId: item.proizvodId,
    quantity: Number(item.kolicina) || 0,
    amount: Number(item.iznosStavke) || 0,
    personalisation: item.personalizacija || null,
    productTitle: item.proizvod?.naziv || `Product #${item.proizvodId}`,
    unitPrice: (Number(item.iznosStavke) || 0) / (Number(item.kolicina) || 1),
  })),
});

function Profile() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersLoaded, setOrdersLoaded] = useState(false);

  useEffect(() => {
    if (!token) {
      setOrders([]);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/porudzbine", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "X-Requested-With": "XMLHttpRequest",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load orders");
        }

        const data = await response.json();
        setOrders(Array.isArray(data) ? data.map(formatOrderForTable) : []);
      } catch (err) {
        setOrders([]);
        console.error(err);
      } finally {
        setOrdersLoading(false);
        setOrdersLoaded(true);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>My Profile</h1>
        <button
          className="btn btn-danger"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>

      <div className="admin-section">
        <div className="info-box">
          <span><strong>Name:</strong></span>
          <span>{`${user?.ime ?? ""} ${user?.prezime ?? ""}`.trim() || "-"}</span>
        </div>
        <div className="info-box">
          <span><strong>Email:</strong></span>
          <span>{user?.email || "-"}</span>
        </div>
      </div>

      <div className="admin-section">
        <OrdersTable orders={orders} isAdmin={false} showEmpty={ordersLoaded} />
      </div>
    </div>
  );
}

export default Profile;

