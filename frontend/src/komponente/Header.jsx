import React from 'react';
import styles from './css/Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1>ShopEasy</h1>
            </div>
            <nav className={styles.nav}>
                <ul>
                    <li><a href="/dashboard">Home</a></li>
                    <li><a href="#products">Products</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            <div className={styles.cart}>
                <button className={styles.cartButton}>
                    🛒 Cart <span className={styles.cartCount}>0</span>
                </button>
            </div>
        </header>
    );
};

export default Header;