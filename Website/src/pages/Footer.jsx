import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
    return (
        <>
           <footer>
                <div className="footer-container">
                    <div className="footer-section about">
                        <h5>Website</h5>
                        {/* <p>Fun toys for every kid!</p> */}
                    </div>
                    <div className="footer-section contact">
                        <h6>Contact Us</h6>
                        <p>83/4A Sahawas colony, Ingawale heights</p>
                        <p>near Karanje naka, Satara</p>
                        <p>Email: info@toyshop.com</p>
                    </div>
                    <div className="footer-section links">
                        <Link to="#">Our Policies</Link>
                        <div className="social-icons">
                            <a href='https://www.facebook.com' target='_blank' rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebook} style={{ color: '#4267B2', fontSize: '30px' }} />
                            </a>
                            <a href='https://instagram.com' target='_blank' rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} style={{ color: '#E1306C', fontSize: '30px' }} />
                            </a>
                        </div>
                    </div>
                </div>
                <hr />
            </footer>
        </>
    )
}

export default Footer