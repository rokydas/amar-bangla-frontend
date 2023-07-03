import React from 'react';
import styles from './AddressBar.module.scss';

const AddressBar = () => {
    return (
        <section className={styles['address-container']}>
            <ul className={`${styles['address-bar']} container d-flex justify-content-between align-items-center`}>
                <ul className="d-flex flex-column flex-md-column flex-lg-row pt-2 pb-2 ps-0">
                    <li className="me-4"><i className="me-2 fas fa-envelope"></i>csecuworkshop@gmail.com</li>
                    <li><i className="me-2 fas fa-map-marker-alt"></i>Chittagong University, Chittagong.</li>
                </ul>
                <ul className={`${styles['social-icons']} d-flex justify-content-evenly bg-white text-black pt-3 pb-3 ps-0`}>
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-linkedin-in"></i>
                    <i className="fab fa-youtube"></i>
                </ul>
            </ul>
        </section>
    );
};

export default AddressBar;