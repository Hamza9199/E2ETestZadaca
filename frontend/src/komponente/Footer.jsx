import React from 'react';
import styles from './css/Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h4>About Us</h4>
                    <p>
                        Welcome to our shopping site! We offer the best products at the best prices.
                    </p>
                </div>
                <div className={styles.section}>
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/dashboard">Shop</a></li>
                        <li><a href="/dashboard">About</a></li>
                        <li><a href="/dashboard">Contact</a></li>
                    </ul>
                </div>
                <div className={styles.section}>
                    <h4>Follow Us</h4>
                    <div className={styles.socialIcons}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </div>
                </div>
            </div>
            <div className={styles.bottomBar}>
                <p>&copy; {new Date().getFullYear()} Shopping Site. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;