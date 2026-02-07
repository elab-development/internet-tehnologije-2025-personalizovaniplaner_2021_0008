import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { productData } from "../../utils/data";
import OrdersTable from "../../components/Orders/OrdersTable";
import "../Admin/admin.css";

const getProduct = (id) => {
  const p = productData.find(prod => prod.id === id);
  return { productId: id, productName: p?.title, qty: 1, price: p?.offerPrice || p?.price };
};

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  //porudžbine za testiranje, biće zamenjene kad se povežemo sa backendom
  const userOrders = [
    {
      id: 2001,
      customerName: user.username,
      date: "2026-01-15",
      status: "Delivered",
      total: 67.80,
      items: [getProduct(5), getProduct(0)]
    },
    {
      id: 2002,
      customerName: user.username,
      date: "2026-02-05",
      status: "Shipped",
      total: 42.30,
      items: [getProduct(3), getProduct(4), getProduct(1)]
    }
  ];

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
          <span><strong>Username:</strong></span>
          <span>{user.username}</span>
        </div>
        <div className="info-box">
          <span><strong>Email:</strong></span>
          <span>{user.email}</span>
        </div>
      </div>

      <div className="admin-section">
        <OrdersTable orders={userOrders} isAdmin={false} />
      </div>
    </div>
  );
}

export default Profile;

