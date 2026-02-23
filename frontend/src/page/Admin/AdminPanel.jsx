import { useAuth } from "../../auth/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table, Modal, Form, Button, Badge, Tab, Tabs } from "react-bootstrap";
import OrdersTable from "../../components/Orders/OrdersTable";
import ExchangeRate from "../../components/ExchangeRate/ExchangeRate";
import "../Admin/admin.css";

const EMPTY_FORM = {
  title: "", type: "", description: "", cat: "", price: "", offerPrice: "",
  availableInStock: "", color: "", material: "", metalColor: "", lining: "", pockets: ""
};

const categoryOptions = [
  { value: 'planners', label: 'Planners' },
  { value: 'pages', label: 'Pages' },
  { value: 'stationery', label: 'Stationery' },
];

const typeOptions = {
  planners: [
    { value: 'largeplanners', label: 'Large Planners' },
    { value: 'smallplanners', label: 'Small Planners' },
  ],
  pages: [
    { value: 'daily', label: 'Daily Pages' },
    { value: 'weekly', label: 'Weekly Pages' },
    { value: 'monthly', label: 'Monthly Pages' },
    { value: 'trackers', label: 'Trackers' },
  ],
  stationery: [
    { value: 'separators', label: 'Planner Separators' },
    { value: 'stickers', label: 'Stickers' },
    { value: 'writingtool', label: 'Writing Tools' },
  ],
};

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

function AdminPanel() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:8000/api/proizvodi", {
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      });

      if (!response.ok) {
        setProducts([]);
        setLoadError("Failed to load data");
        return;
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        const list = data.map((product) => ({
          id: product.id,
          title: product.naziv,
          type: product.tip,
          description: product.opis,
          price: Number(product.cena) || 0,
          offerPrice: product.cenaPopust !== null ? Number(product.cenaPopust) : null,
          cat: product.kategorija.toLowerCase(),
          availableInStock: Number(product.dostupnaKolicina) || 0,
          color: product.bojaProizvoda,
          material: product.materijalProizvoda,
          metalColor: product.planer?.bojaMetala ?? "",
          lining: product.planer?.postava ?? "",
          pockets: product.planer?.brojDzepova ?? "",
        }));
        setProducts(list);
      } else {
        setProducts([]);
      }
      setLoadError(null);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!token) {
      setOrders([]);
      setUsers([]);
      setLoadError(null);
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
        const mappedOrders = Array.isArray(data) ? data.map(formatOrderForTable) : [];
        const mappedUsers = Array.isArray(data)
          ? data
              .map((order) => order?.kupac)
              .filter(Boolean)
              .map((kupac) => ({
                id: kupac.id,
                name: `${kupac.ime ?? ""} ${kupac.prezime ?? ""}`.trim() || `User #${kupac.id}`,
                address: kupac.adresa || null,
              }))
          : [];

        setOrders(mappedOrders);
        setUsers(mappedUsers);
        setLoadError(null);
      } catch (err) {
        setOrders([]);
        setUsers([]);
        setLoadError("Failed to load data");
        console.error(err);
      } finally {
        setOrdersLoaded(true);
      }
    };

    fetchOrders();
  }, [token]);

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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cat') {
      setFormData(prev => ({ ...prev, [name]: value, type: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  const handleSaveProduct = async () => {
  if (!formData.title || !formData.type || !formData.cat || !formData.price || !formData.availableInStock || !formData.color || !formData.material || !formData.description) {
    alert("Please fill in all required fields");
    return;
  }

  if (formData.cat === "planners" && (!formData.metalColor || !formData.lining || !formData.pockets)) {
    alert("Please fill in all planner fields (Metal Color, Lining, Pockets)");
    return;
  }

  let endpoint = 'http://localhost:8000/api/proizvodi';
  let method = 'POST';

  if (editingProduct) {
    endpoint = `http://localhost:8000/api/proizvodi/${editingProduct.id}`;
    method = 'PUT';
  }

  const categoryLabel = categoryOptions.find(opt => opt.value === formData.cat)?.label || formData.cat;
  const typeLabel = formData.cat && typeOptions[formData.cat] 
    ? typeOptions[formData.cat].find(opt => opt.value === formData.type)?.label || formData.type
    : formData.type;

  const payload = {
    naziv: formData.title,
    tip: typeLabel,
    opis: formData.description,
    cena: Number(formData.price),
    cenaPopust: formData.offerPrice ? Number(formData.offerPrice) : null,
    kategorija: categoryLabel,
    dostupnaKolicina: Number(formData.availableInStock),
    bojaProizvoda: formData.color,
    materijalProizvoda: formData.material,
  };

  try {
    const response = await fetch(endpoint, {
      method: method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setMessage("❌ Error saving product");
      setTimeout(() => setMessage(null), 4000);
      return;
    }

    const data = await response.json();
    
    let newProducts = [];
    if (editingProduct) {
      newProducts = products.map(p => {
        if (p.id === editingProduct.id) {
          return {
            id: data.proizvod.id,
            title: data.proizvod.naziv,
            type: data.proizvod.tip,
            description: data.proizvod.opis,
            price: Number(data.proizvod.cena),
            offerPrice: data.proizvod.cenaPopust !== null ? Number(data.proizvod.cenaPopust) : null,
            cat: data.proizvod.kategorija.toLowerCase(),
            availableInStock: Number(data.proizvod.dostupnaKolicina),
            color: data.proizvod.bojaProizvoda,
            material: data.proizvod.materijalProizvoda,
            metalColor: "",
            lining: "",
            pockets: "",
          };
        }
        return p;
      });
      setProducts(newProducts);
      setMessage("✏️ Product updated successfully!");
    } else {
      const newProduct = {
        id: data.proizvod.id,
        title: data.proizvod.naziv,
        type: data.proizvod.tip,
        description: data.proizvod.opis,
        price: Number(data.proizvod.cena),
        offerPrice: data.proizvod.cenaPopust !== null ? Number(data.proizvod.cenaPopust) : null,
        cat: data.proizvod.kategorija.toLowerCase(),
        availableInStock: Number(data.proizvod.dostupnaKolicina),
        color: data.proizvod.bojaProizvoda,
        material: data.proizvod.materijalProizvoda,
        metalColor: "",
        lining: "",
        pockets: "",
      };
      setProducts([...products, newProduct]);
      setMessage("✅ Product added successfully!");
    }

    setTimeout(() => setMessage(null), 4000);
    handleCloseModal();
  } catch (err) {
    alert("Greška pri čuvanju proizvoda");
  }
};

  const handleDeleteProduct = (id) => {
  setProductToDelete(id);
  setShowDeleteModal(true);
};

  const handleOrderStatusChange = async (orderId, status) => {
    if (!token) {
      alert("You must be logged in to edit orders.");
      return;
    }

    const response = await fetch(`http://localhost:8000/api/porudzbine/${orderId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      alert("There was an error in editing the status of the order. Try again later.");
      return;
    }

    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
    alert("Status updated.");
  };

const confirmDeleteProduct = async () => {
  try {
    const response = await fetch(`http://localhost:8000/api/proizvodi/${productToDelete}`, {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    if (!response.ok) {
      alert("Error deleting product");
      return;
    }

    setProducts(prevProducts => prevProducts.filter(product => product.id !== productToDelete));
    setMessage("🗑️ Product deleted successfully!");
    setTimeout(() => setMessage(null), 4000);
  } catch (err) {
    alert("Error deleting product");
  } finally {
    setShowDeleteModal(false);
    setProductToDelete(null);
  }
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
            {message && (
              <div className="alert alert-info rounded-3 shadow-sm mb-3">
                {message}
              </div>
            )}
            {loadError && (
              <div className="alert alert-warning rounded-3 shadow-sm mb-3">
                {loadError}
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
            {loadError && (
              <div className="alert alert-warning rounded-3 shadow-sm mb-3">
                {loadError}
              </div>
            )}
            <OrdersTable
              orders={orders}
              isAdmin={true}
              onStatusChange={handleOrderStatusChange}
              users={users}
              showEmpty={ordersLoaded}
            />
          </div>
        </Tab>
      </Tabs>

      <ExchangeRate />

      {/*Modal - Forma za editovanje ili dodavanje proizvoda*/}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? "Edit Product" : "Add New Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="cat"
                    value={formData.cat}
                    onChange={handleFormChange}
                    disabled={!!editingProduct}
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                    disabled={!formData.cat}
                  >
                    <option value="">Select Type</option>
                    {formData.cat && typeOptions[formData.cat] && typeOptions[formData.cat].map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            {[
              [{ label: "Title", name: "title" }, { label: "Available in Stock", name: "availableInStock", type: "number" }],
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

            {formData.cat === "planners" && (
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
