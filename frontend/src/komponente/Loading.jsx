import styles from './css/Loading.module.css';
import React from 'react';

const Loading = () => {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.spinner}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
            </div>
            <p className={styles.text}>Loading...</p>
        </div>
    );
}

export default Loading;
