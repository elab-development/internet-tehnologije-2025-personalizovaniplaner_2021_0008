import { useAuth } from "../../auth/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { productData } from "../../utils/data";
import { Table, Modal, Form, Button, Badge, Tab, Tabs } from "react-bootstrap";
import OrdersTable from "../../components/Orders/OrdersTable";
import "../Admin/admin.css";

const EMPTY_FORM = {
  title: "", type: "", description: "", cat: "", price: "", offerPrice: "",
  availableInStock: "", color: "", material: "", metalColor: "", lining: "", pockets: ""
};

const getProduct = (id) => {
  const p = productData.find(prod => prod.id === id);
  return { productId: id, productName: p?.title, qty: 1, price: p?.offerPrice || p?.price };
};

function AdminPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState(productData);
  const [activeTab, setActiveTab] = useState("products");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productMessage, setProductMessage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [orders, setOrders] = useState([
    {
      id: 1001, customerName: "Ana Petrović", date: "2026-02-01", status: "Shipped", total: 37.90,
      items: [getProduct(5), getProduct(0)]
    },
    {
      id: 1002, customerName: "Marko Tomić", date: "2026-02-03", status: "Pending", total: 38.90,
      items: [getProduct(6), getProduct(1), { ...getProduct(3), qty: 2 }]
    }
  ]);
  const [formData, setFormData] = useState(EMPTY_FORM);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  const handleShowModal = (product = null) => {
    setEditingProduct(product);
    setFormData(product || EMPTY_FORM);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData(EMPTY_FORM);
  };

  const handleFormChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSaveProduct = () => {
  if (editingProduct) {
    // Ako se edituje postojeći proizvod
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === editingProduct.id
          ? { ...editingProduct, ...formData }
          : product
      )
    );
    setProductMessage("✏️ Product updated successfully!");
  } else {
    // Ako se dodaje novi proizvod
    const newProduct = {
      ...formData,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
    setProductMessage("✅ Product added successfully!");
  }
  setTimeout(() => setProductMessage(null), 4000);
  handleCloseModal();
};

  const handleDeleteProduct = (id) => {
  setProductToDelete(id);
  setShowDeleteModal(true);
};

const confirmDeleteProduct = () => {
  setProducts(prevProducts => prevProducts.filter(product => product.id !== productToDelete));
  setDeleteMessage("🗑️ Product deleted successfully!");
  setTimeout(() => setDeleteMessage(null), 4000);
  setShowDeleteModal(false);
  setProductToDelete(null);
};

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <div>
          <span className="admin-user">Welcome, <b>{user.username}</b></span>
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
      </div>

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="admin-tabs mb-4">
        {/*Kartica proizvodi*/}
        <Tab eventKey="products" title="Products">
          <div className="admin-section">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Product Management</h3>
              <Button variant="success" onClick={() => handleShowModal()}>
                + Add Product
              </Button>
            </div>
            {productMessage && (
              <div className="alert alert-success rounded-3 shadow-sm mb-3">
                {productMessage}
              </div>
            )}
            {deleteMessage && (
              <div className="alert alert-danger rounded-3 shadow-sm mb-3">
                {deleteMessage}
              </div>
            )}
            <div className="admin-table-container">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.title}</td>
                      <td>{product.type}</td>
                      <td>{product.cat}</td>
                      <td>€{product.price}</td>
                      <td>
                        <Badge
                          bg={product.availableInStock > 0 ? "success" : "danger"}
                        >
                          {product.availableInStock}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleShowModal(product)}
                          className="me-2"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Tab>

        {/*Kartica porudžbine*/}
        <Tab eventKey="orders" title="Orders">
          <div className="admin-section">
            <OrdersTable 
              orders={orders} 
              isAdmin={true} 
              onStatusChange={(id, status) => alert("There was an error in editing the status of the order. Try again later.")}
            />
          </div>
        </Tab>
      </Tabs>

      {/*Modal - Forma za editovanje ili dodavanje proizvoda*/}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? "Edit Product" : "Add New Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {[
              [{ label: "Title", name: "title" }, { label: "Type", name: "type" }],
              [{ label: "Category", name: "cat" }, { label: "Available in Stock", name: "availableInStock", type: "number" }],
              [{ label: "Price (€)", name: "price", type: "number" }, { label: "Offer Price (€)", name: "offerPrice", type: "number" }],
              [{ label: "Color", name: "color" }, { label: "Material", name: "material" }]
            ].map((row, i) => (
              <div className="row" key={i}>
                {row.map(field => (
                  <div className="col-md-6" key={field.name}>
                    <Form.Group className="mb-3">
                      <Form.Label>{field.label}</Form.Label>
                      <Form.Control
                        type={field.type || "text"}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleFormChange}
                      />
                    </Form.Group>
                  </div>
                ))}
              </div>
            ))}

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleFormChange}
              />
            </Form.Group>

            {formData.cat === "Planners" && (
              <div className="row">
                {[
                  { label: "Metal Color", name: "metalColor" },
                  { label: "Lining", name: "lining" },
                  { label: "Pockets", name: "pockets" }
                ].map(field => (
                  <div className="col-md-4" key={field.name}>
                    <Form.Group className="mb-3">
                      <Form.Label>{field.label}</Form.Label>
                      <Form.Control
                        type="text"
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleFormChange}
                      />
                    </Form.Group>
                  </div>
                ))}
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveProduct}>
            {editingProduct ? "Update Product" : "Add Product"} {/*proizvod se izmeni ili doda*/}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal za potvrdu brisanja proizvoda */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this product?
      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
    </Modal>
    </div>
  );
}

export default AdminPanel;
