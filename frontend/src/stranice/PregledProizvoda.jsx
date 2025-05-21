import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./css/PregledProizvoda.module.css";
import Header from "../komponente/Header";
import Footer from "../komponente/Footer";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Loading from "../komponente/Loading";

export default function PregledProizvoda() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/server/proizvod/${id}`);
                if (response.status !== 200) throw new Error("Failed to fetch product");
                setProduct(response.data);
                setSelectedImage(response.data.slike?.[0]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <Loading/>;
    if (error) return <h1 className={styles.title}>Error: {error}</h1>;
    if (!product) return <h1 className={styles.title}>Product not found</h1>;


    const handleAddToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem("korpa")) || [];
        const existingProduct = existingCart.find((item) => item.id === product.id);

        if (existingProduct) {
            existingProduct.kolicina += 1;
        } else {
            existingCart.push({ ...product, kolicina: 1 });
        }

        localStorage.setItem("korpa", JSON.stringify(existingCart));

        // Show a styled notification instead of alert
        const notification = document.createElement("div");
        notification.innerText = "Product added to cart successfully!";
        notification.style.position = "fixed";
        notification.style.top = "70px";
        notification.style.right = "20px";
        notification.style.background = "#4BB543";
        notification.style.color = "#fff";
        notification.style.padding = "16px 24px";
        notification.style.borderRadius = "8px";
        notification.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
        notification.style.fontSize = "1rem";
        notification.style.zIndex = "9999";
        notification.style.transition = "opacity 0.5s";
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = "0";
            setTimeout(() => {
            document.body.removeChild(notification);
            }, 500);
        }, 2000);
        
    }

    return (
        <>
            <Header />
            <div className={styles.page}>
                <motion.div className={styles.card} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
                    <div className={styles.imageSection}>
                        <img
                            src={product.slika || "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flaptopmedia.com%2Fwp-content%2Fuploads%2F2023%2F12%2F4-10.jpg&f=1&nofb=1&ipt=f478cbc201bbb853cedaf546be8f2271876e7b8a814a9ee2d21604a22cf997cd"}
                            alt={product.naziv}
                            className={styles.image}
                        />
                        <div className={styles.thumbnailRow}>
                            {product.slike?.map((slika, index) => (
                                <img
                                    key={index}
                                    src={slika}
                                    alt={`thumb-${index}`}
                                    className={`${styles.thumbnail} ${selectedImage === slika ? styles.activeThumb : ""}`}
                                    onClick={() => setSelectedImage(slika)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={styles.infoSection}>
                        <h1 className={styles.productName}>{product.naziv}</h1>
                        <div className={styles.rating}>⭐ {product.rating || 4.5}/5</div>
                        <p className={styles.description}>{product.opis}</p>
                        <p className={styles.price}>${product.cijena}</p>

                        {product.specifikacije && (
                            <div className={styles.specs}>
                                <h3>Specifications:</h3>
                                <ul>
                                    {product.specifikacije.map((spec, index) => (
                                        <li key={index}>{spec}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className={styles.buttonGroup}>
                            <button onClick={handleAddToCart} className={styles.cartButton}>Add to Cart 🛒</button>
                        </div>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </>
    );
}
