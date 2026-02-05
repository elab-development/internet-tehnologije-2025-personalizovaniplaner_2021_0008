import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard/ProductCard';
import { productData } from '../../utils/data';
import { useCart } from '../../contexts/CartContext';
import { useSearch } from '../../contexts/SearchContext';
import './shop.css';

const Shop = () => {
  const { category, type } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { query } = useSearch();

  //Stanje filtera koje se postavlja na osnovu URL parametara i korisničkih interakcija
  const [filters, setFilters] = useState({
    category: category ? category.toLowerCase() : '',
    type: type ? type.toLowerCase() : '',
    inStock: false,
    material: '',
  });

  //Ažuriranje filtera kada se promene parametri rute
  useEffect(() => {
    setFilters({
      category: category ? category.toLowerCase() : '',
      type: type ? type.toLowerCase() : '',
      inStock: false,
      material: '',
    });
  }, [category, type]);

  //Mapiranje kategorija na prikazna imena
  const categoryMap = {
    planners: 'Planners',
    pages: 'Pages',
    stationery: 'Stationery',
  };

  //Opcije tipova po kategoriji
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

  const materialOptions = ['Leather', 'Plastic', 'Fabric', 'Paper'];

  const updateFilters = (next) => {
    setFilters((prev) => ({ ...prev, ...next }));
  };

  //praćenje promene kategorije i ažuriranje URL-a
  const handleCategoryChange = (newCategory) => {
    const categoryKey = newCategory.toLowerCase();
    updateFilters({ category: categoryKey, type: '' });
    navigate(`/shop/${categoryKey}`);
  };

  //praćenje promene tipa i ažuriranje URL-a
  const handleTypeChange = (newType) => {
    updateFilters({ type: newType });
    if (filters.category) {
      navigate(`/shop/${filters.category}/${newType}`);
    }
  };

  //praćenje promene filtera za dostupnost na stanju
  const handleStockChange = (e) => {
    updateFilters({ inStock: e.target.checked });
  };

  //praćenje promene filtera za materijal
  const handleMaterialChange = (e) => {
    updateFilters({ material: e.target.value });
  };

  //filtriranje proizvoda na osnovu aktivnih filtera
  const filteredProducts = productData.filter((product) => {
    if (filters.category && product.cat.toLowerCase() !== filters.category) {
      return false;
    }

    if (filters.type) {
      const productType = product.type.toLowerCase().replace(/\s+/g, '');
      if (!productType.includes(filters.type)) {
        return false;
      }
    }

    if (filters.inStock && product.availableInStock === 0) {
      return false;
    }

    if (filters.material) {
      const materialMatch = product.material.toLowerCase().includes(filters.material.toLowerCase());
      if (!materialMatch) {
        return false;
      }
    }

    if (query) {
      const searchLower = query.toLowerCase();
      const titleMatch = product.title.toLowerCase().includes(searchLower);
      const descriptionMatch = product.description.toLowerCase().includes(searchLower);
      const typeMatch = product.type.toLowerCase().includes(searchLower);
      if (!titleMatch && !descriptionMatch && !typeMatch) {
        return false;
      }
    }

    return true;
  });

  return (
    <>
      <section className="shop-section py-5">
        <Container>
          {/*Zaglavlje prodavnice*/}
          <Row className="mb-4">
            <Col>
              <div className="section-header">
                <h2 className="heading">Shop</h2>
                <p className="body-text">
                  {query
                    ? `Search results for "${query}"`
                    : filters.category
                    ? `Browse our ${categoryMap[filters.category] || filters.category} collection`
                    : 'Explore all our premium stationery and planning products'}
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            {/*Filteri sa strane*/}
            <Col lg={3} md={4} className="mb-4">
              <div className="filters-section">
                {/*Category filter*/}
                <div className="filter-group">
                  <h5 className="filter-title">Category</h5>
                  <Form.Select
                    value={filters.category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="form-select-sm"
                  >
                    <option value="">All Categories</option>
                    <option value="planners">Planners</option>
                    <option value="pages">Pages</option>
                    <option value="stationery">Stationery</option>
                  </Form.Select>
                </div>

                {/*Type filter*/}
                {filters.category && typeOptions[filters.category] && (
                  <div className="filter-group">
                    <h5 className="filter-title">Type</h5>
                    <Form.Select
                      value={filters.type}
                      onChange={(e) => handleTypeChange(e.target.value)}
                      className="form-select-sm"
                    >
                      <option value="">All Types</option>
                      {typeOptions[filters.category].map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                )}

                {/*Material filter*/}
                <div className="filter-group">
                  <h5 className="filter-title">Material</h5>
                  <Form.Select
                    value={filters.material}
                    onChange={handleMaterialChange}
                    className="form-select-sm"
                  >
                    <option value="">All Materials</option>
                    {materialOptions.map((material) => (
                      <option key={material} value={material}>
                        {material}
                      </option>
                    ))}
                  </Form.Select>
                </div>

                {/*Filter da li ima na stanju*/}
                <div className="filter-group">
                  <Form.Check
                    type="checkbox"
                    label="In Stock Only"
                    checked={filters.inStock}
                    onChange={handleStockChange}
                    className="filter-checkbox"
                  />
                </div>

                {/*Dugme za brisanje filtera*/}
                <Button
                  variant="outline-secondary"
                  className="w-100 mt-3"
                  onClick={() => {
                    setFilters({
                      category: '',
                      type: '',
                      inStock: false,
                      material: '',
                    });
                    navigate('/shop');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </Col>

            {/*Proizvodi*/}
            <Col lg={9} md={8}>
              <Row>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <Col lg={4} md={6} sm={6} xs={12} key={index} className="mb-4">
                      <ProductCard product={product} onAddToCart={addToCart} />
                    </Col>
                  ))
                ) : (
                  <Col xs={12}>
                    <div className="text-center py-5">
                      <p className="body-text">No products found matching your filters.</p>
                    </div>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Shop;
