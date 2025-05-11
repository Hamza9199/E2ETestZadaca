import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./css/PregledProizvoda.module.css"; 
import axios from "axios";

export default function PregledProizvoda() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/server/proizvod/${id}`);
                if (response.status !== 200) {
                    throw new Error("Failed to fetch product");
                }
                setProduct(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <h1 className={styles.title}>Loading...</h1>;
    }

    if (error) {
        return <h1 className={styles.title}>Error: {error}</h1>;
    }

    if (!product) {
        return <h1 className={styles.title}>Product not found</h1>;
    }

    return (
        <>
            <h1 className={styles.title}>Product Overview</h1>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h2>{product.naziv}</h2>
                    <p>{product.opis}</p>
                    <p>Price: {product.cijena}</p>
                </div>
            </div>
        </>
    );
}
