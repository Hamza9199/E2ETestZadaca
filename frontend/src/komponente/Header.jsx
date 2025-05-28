import React, {useEffect, useState} from 'react';
import styles from './css/Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const user = localStorage.getItem("user");
    const [korpaData, setKorpaData] = useState(JSON.parse(localStorage.getItem("korpa")) || []);
    const [brojProizvoda, setBrojProizvoda] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setKorpaData(JSON.parse(localStorage.getItem("korpa")) || []);
    }, []);

    useEffect(() => {
        const broj = korpaData.reduce((acc, item) => acc + item.kolicina, 0);
        setBrojProizvoda(broj);
    }, [korpaData]);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1>ShopEasy</h1>
            </div>
            <nav className={styles.nav}>
                <ul>
                    <li><a href="/">Početna</a></li>
                    <li><a href="/admin">Admin Panel</a></li>
                    <li>
                        {user ? (
                            <a
                                href="/"
                                onClick={() => {
                                    localStorage.removeItem("user");
                                    window.location.reload();
                                }}
                            >
                                Odjava
                            </a>
                        ) : (
                            <a href="/login">Prijava</a>
                        )}
                    </li>
                </ul>
            </nav>
            <div className={styles.cart}>
                <button onClick={() => navigate("/korpa")} className={styles.cartButton}>
                    🛒 Korpa <span className={styles.cartCount}>{brojProizvoda}</span>
                </button>
            </div>
        </header>
    );
};

export default Header;