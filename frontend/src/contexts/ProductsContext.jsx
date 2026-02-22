import React, { createContext, useContext, useEffect, useState } from 'react';

const ProductsContext = createContext();

const mapApiProduct = (product) => {
  if (!product) {
    return null;
  }

  return {
    id: product.id,
    title: product.naziv,
    type: product.tip,
    description: product.opis,
    price: Number(product.cena),
    offerPrice: product.cenaPopust !== null ? Number(product.cenaPopust) : null,
    cat: product.kategorija,
    availableInStock: Number(product.dostupnaKolicina),
    color: product.bojaProizvoda,
    material: product.materijalProizvoda,
    metalColor: product.planer?.bojaMetala ?? null,
    lining: product.planer?.postava ?? null,
    pockets: product.planer?.brojDzepova ?? null,
    image: product.slika || null,
  };
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/proizvodi', {
          headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to load products');
        }

        const data = await response.json();
        const mapped = Array.isArray(data)
          ? data.map((item) => mapApiProduct(item)).filter(Boolean)
          : [];

        if (isActive) {
          setProducts(mapped);
          setError(null);
        }
      } catch (err) {
        if (isActive) {
          setProducts([]);
          setError(err.message || 'Failed to load products');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider');
  }
  return context;
};
