import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './css/Dashboard.module.css';
import Header from '../komponente/Header';
import Footer from '../komponente/Footer';

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

  if (loading) return <h1 className={styles.loading}>Loading...</h1>;
  if (error) return <h1 className={styles.error}>{error}</h1>;

  const handleBuyNow = (productId) => {
    navigate(`/proizvod/${productId}`);
  };

  return (
    <>
    <Header/>
    <div className={styles.dashboard}>
      <section className={styles.hero}>
        <h1>Welcome to the Future of Shopping</h1>
        <p>Discover top products at amazing prices!</p>
      </section>

      <section className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <img
              src={product.slika || 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flaptopmedia.com%2Fwp-content%2Fuploads%2F2023%2F12%2F4-10.jpg&f=1&nofb=1&ipt=f478cbc201bbb853cedaf546be8f2271876e7b8a814a9ee2d21604a22cf997cd'}
              alt={product.naziv}
              className={styles.image}
            />
            <div className={styles.cardContent}>
              <h2>{product.naziv}</h2>
              <p>{product.opis}</p>
              <p className={styles.price}>${product.cijena}</p>
              <button onClick={() => handleBuyNow(product.id)} className={styles.button}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
    <Footer/>
    </>
  );
}
