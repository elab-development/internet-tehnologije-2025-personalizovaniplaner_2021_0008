import React from 'react';
import Slider from '../../components/Slider/Slider';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Col, Container, Row } from 'react-bootstrap';
import { featureData } from '../../utils/data';
import { useCart } from '../../contexts/CartContext';
import './Home.css';
import Categories from '../../components/Categories/Categories';
import { useSearch } from '../../contexts/SearchContext';  
import { useProducts } from '../../contexts/ProductsContext';

const Home = () => {
  const { addToCart } = useCart();
  const { query } = useSearch();   
  const { products, loading } = useProducts();

  // filtriranje proizvoda
  const filteredProducts = products.filter(product =>
  product.title.toLowerCase().includes(query.toLowerCase()) ||
  product.cat.toLowerCase().includes(query.toLowerCase())
);


  return (
    <>
      <Slider />
      <section className="py-5">
        <Container>
          <Row>
            {featureData.map((val, index) => (
              <Col md={6} lg={3} sm={6} key={index}>
                <div className="d-flex align-items-start">
                  <div className="mb-3 ms-3">
                    <img
                      style={{
                        width: "120px",
                        height: "120px",
                        padding: "20px",
                        objectFit: "cover",
                        borderRadius: "50%"
                      }}
                      src={val.image}
                      alt={val.title}
                    />
                  </div>
                  <div className="text">
                    <h3 className="sub-heading mb-1">{val.title}</h3>
                    <p className="body-text">{val.text}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Proizvodi */}
      <section className="products-section py-5">
        <Container>
          <Row className="mb-4">
            <Col>
              <div className="section-header">
                <h2 className="heading">Our Products</h2>
                <p className="body-text">Explore our collection of premium stationery and planning products</p>
              </div>
            </Col>
          </Row>
          <Row>
            {loading ? (
              <p className="text-center">Loading products...</p>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Col lg={4} md={6} sm={6} xs={12} key={product.id} className="mb-4">
                  <ProductCard product={product} onAddToCart={addToCart} />
                </Col>
              ))
            ) : (
              <p className="text-center">No products found.</p>
            )}
          </Row>
        </Container>
      </section>

      <Categories />
    </>
  );
};

export default Home;
