import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './css/Dashboard.module.css';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/server/proizvod'); 
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;


  const handleBuyNow = (productId) => {
    
    navigate(`/proizvod/${productId}`);
  }

  return (
    <>
      <h1 data-testid="page-title" className={styles.title}>Shop Our Products</h1>
      <div data-testid="product-container" className={styles.container}>
        {products.map((product) => (
          <div key={product.id} data-testid="product-card" className={styles.card}>
            <h2>{product.naziv}</h2>
            <p>{product.opis}</p>
            <p data-testid="product-price" className={styles.price}>Price: ${product.cijena}</p>
            <button data-testid="buy-now" onClick={() => handleBuyNow(product.id)} className={styles.button}>Buy Now</button>
          </div>
        ))}
      </div>

    </>
  );
}
