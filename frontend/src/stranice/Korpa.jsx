import React from "react";
import styles from "./css/Korpa.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../komponente/Header";
import Footer from "../komponente/Footer";

const Korpa = () => {
    const [korpa, setKorpa] = useState([]);
    const [ukupno, setUkupno] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const korpaData = JSON.parse(localStorage.getItem("korpa")) || [];
        setKorpa(korpaData);
        const ukupnoCijena = korpaData.reduce((acc, item) => acc + item.cijena * item.kolicina, 0);
        setUkupno(ukupnoCijena);
    }, []);

    const obrisiIzKorpe = (id) => {
        const novaKorpa = korpa.filter((item) => item.id !== id);
        setKorpa(novaKorpa);
        localStorage.setItem("korpa", JSON.stringify(novaKorpa));
        const ukupnoCijena = novaKorpa.reduce((acc, item) => acc + item.cijena * item.kolicina, 0);
        setUkupno(ukupnoCijena);

         // Show a styled notification instead of alert
        const notification = document.createElement("div");
        notification.innerText = "Product removed from cart successfully!";
        notification.style.position = "fixed";
        notification.style.top = "70px";
        notification.style.right = "20px";
        notification.style.background = "#e53935"; // red color
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
    };

    return (
        <>
            <Header />
            <div className={styles.korpa} data-testid="korpa">
                <h1>🛒 Vaša Korpa</h1>
                {korpa.length === 0 ? (
                    <p className={styles.empty} data-testid="korpa-empty">Korpa je prazna</p>
                ) : (
                    <ul data-testid="korpa-list">
                        {korpa.map((item) => (
                            <li key={item.id} data-testid="korpa-item">
                                <div className={styles.itemInfo}>
                                    <span className={styles.itemName} data-testid="item-name">{item.naziv}</span>
                                    <span className={styles.itemQty} data-testid="item-qty">x{item.kolicina}</span>
                                </div>
                                <div className={styles.itemPrice}>
                                    <span data-testid="item-price">{(item.cijena * item.kolicina).toFixed(2)} KM</span>
                                    <button className={styles.removeBtn} data-testid="remove-btn" onClick={() => obrisiIzKorpe(item.id)}>
                                        Obriši
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <h2 className={styles.total}>Ukupno: <span data-testid="korpa-total">{ukupno.toFixed(2)} KM</span></h2>
                <button className={styles.buyBtn} data-testid="continue-btn" onClick={() => navigate("/")}>Nastavi kupovinu</button>
            </div>
            <Footer />
        </>
    );
};

export default Korpa;
