import React from 'react';
import styles from './css/Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h4>O nama</h4>
                    <p>
                        Dobrodošli na našu stranicu za kupovinu! Nudimo najbolje proizvode po najboljim cijenama.
                    </p>
                </div>
                <div className={styles.section}>
                    <h4>Brzi linkovi</h4>
                    <ul>
                        <li><a href="/">Prodavnica</a></li>
                        <li><a href="/">O nama</a></li>
                    </ul>
                </div>
                <div className={styles.section}>
                    <h4>Pratite nas</h4>
                    <div className={styles.socialIcons}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </div>
                </div>
            </div>
            <div className={styles.bottomBar}>
                <p>&copy; {new Date().getFullYear()} Stranica za kupovinu. Sva prava zadržana.</p>
            </div>
        </footer>
    );
};

export default Footer;