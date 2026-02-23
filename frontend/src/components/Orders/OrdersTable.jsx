import { useState } from "react";
import { Table, Form, Button, Badge } from "react-bootstrap";
import "./OrdersTable.css";

function OrdersTable({ orders, isAdmin = false, onStatusChange, users = [], showEmpty = true }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getUserInfo = (userId) => users.find(u => u.id === userId);

  const getStatusColor = (status) => {
    if (status === "Delivered") return "success";
    if (status === "Shipped") return "info";
    if (status === "Cancelled") return "danger";
    return "warning";
  };

  const formatDateTime = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";

    return date.toISOString().slice(0, 10);
  };

  return (
    <div className="orders-section">
      <h3>Orders</h3>
      {orders.length === 0 ? (
        showEmpty ? (
        <p className="text-center py-4">There are no orders</p>
        ) : null
      ) : (
        <div className="orders-table-container">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Order ID</th>
                {isAdmin && <th>User</th>}
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                {isAdmin && (
                  <td>
                    {getUserInfo(order.userId)?.name || `User #${order.userId}`}
                    {getUserInfo(order.userId)?.address && (
                      <div className="text-muted small">{getUserInfo(order.userId).address}</div>
                    )}
                  </td>
                )}
                <td>{formatDateTime(order.dateCreated)}</td>
                <td>
                  {isAdmin ? (
                    <Form.Select
                      value={order.status}
                      onChange={(e) => onStatusChange(order.id, e.target.value)}
                      size="sm"
                    >
                      <option>Pending</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </Form.Select>
                  ) : (
                    <Badge bg={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  )}
                </td>
                <td>€{order.totalAmount.toFixed(2)}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      )}

      {/*detalji porudžbine*/}
      {selectedOrder && (
        <div className="order-details-popup">
          <div className="popup-content">
            <button
              className="popup-close"
              onClick={() => setSelectedOrder(null)}
            >
              ✕
            </button>
            <h5>Order #{selectedOrder.id}</h5>
            <p>
              <strong>Date Created:</strong> {formatDateTime(selectedOrder.dateCreated)}
            </p>
            {selectedOrder.dateSent && (
              <p>
                <strong>Date Sent:</strong> {formatDateTime(selectedOrder.dateSent)}
              </p>
            )}
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <hr />
            <p>
              <strong>Order Items:</strong>
            </p>
            {selectedOrder.orderItems.map((item) => (
              <div key={item.number} className="order-item">
                <span>
                  {item.number}. {item.productTitle} (x{item.quantity})
                  {item.personalisation && (
                    <div className="text-muted small">{item.personalisation}</div>
                  )}
                </span>
                <span>€{item.amount.toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <p className="total">
              <strong>Total: €{selectedOrder.totalAmount.toFixed(2)}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersTable;
