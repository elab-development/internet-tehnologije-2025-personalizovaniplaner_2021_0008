import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { productData } from "../../utils/data";
import OrdersTable from "../../components/Orders/OrdersTable";
import "../Admin/admin.css";

const getOrderItem = (number, productId, quantity = 1, personalisation = null) => {
  const product = productData.find(p => p.id === productId);
  if (!product) return null;
  
  const price = product.offerPrice || product.price;
  return {
    number,
    productId,
    quantity,
    amount: price * quantity,
    personalisation,
    productTitle: product.title,
    unitPrice: price
  };
};

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  //porudžbine za testiranje, biće zamenjene kad se povežemo sa backendom
  const userOrders = [
    {
      id: 2001,
      userId: user?.id || 201,
      dateCreated: "2026-01-15",
      dateSent: "2026-01-18",
      status: "Delivered",
      totalAmount: 67.80,
      orderItems: [
        getOrderItem(1, 5, 1),
        getOrderItem(2, 0, 1)
      ]
    },
    {
      id: 2002,
      userId: user?.id || 201,
      dateCreated: "2026-02-05",
      dateSent: null,
      status: "Shipped",
      totalAmount: 42.30,
      orderItems: [
        getOrderItem(1, 3, 1, "Text: My Planner, Font: Serif, Color: #000000"),
        getOrderItem(2, 4, 1),
        getOrderItem(3, 1, 1)
      ]
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
          <span><strong>Name:</strong></span>
          <span>{`${user?.ime ?? ""} ${user?.prezime ?? ""}`.trim() || "-"}</span>
        </div>
        <div className="info-box">
          <span><strong>Email:</strong></span>
          <span>{user?.email || "-"}</span>
        </div>
      </div>

      <div className="admin-section">
        <OrdersTable orders={userOrders} isAdmin={false} />
      </div>
    </div>
  );
}

export default Profile;

