import { useState } from "react";
import { Table, Form, Button, Badge } from "react-bootstrap";
import "./OrdersTable.css";

function OrdersTable({ orders, isAdmin = false, onStatusChange }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusColor = (status) => {
    if (status === "Delivered") return "success";
    if (status === "Shipped") return "info";
    if (status === "Cancelled") return "danger";
    return "warning";
  };

  return (
    <div className="orders-section">
      <h3>Orders</h3>
      <div className="orders-table-container">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              {isAdmin && <th>Customer</th>}
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
                {isAdmin && <td>{order.customerName}</td>}
                <td>{order.date}</td>
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
                <td>€{order.total.toFixed(2)}</td>
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
              <strong>Date:</strong> {selectedOrder.date}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <hr />
            <p>
              <strong>Items:</strong>
            </p>
            {selectedOrder.items.map((item, i) => (
              <div key={i} className="order-item">
                <span>
                  #{item.productId} - {item.productName} (x{item.qty})
                </span>
                <span>€{(item.qty * item.price).toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <p className="total">
              <strong>Total: €{selectedOrder.total.toFixed(2)}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersTable;
