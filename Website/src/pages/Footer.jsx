import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
    return (
        <>
            <footer style={{ marginTop: '13%', backgroundColor: 'lightgrey', width: '100%' }}>

                <div className="container" >
                    <div className="footer1">
                        <h5>The Toy Shop</h5>
                        
                        <div className="row py-3">
                            <div className=" d-flex justify-content-center " >
                                <div className="d-flex flex-column align-items-center " style={{ minWidth: '300px' }} >
                                    <Link>Contact us</Link>
                                    <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>
                                        83/4A Sahawas colony, Ingawale heights
                                    </p>
                                    <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>
                                        near Karanje naka ,Satara
                                    </p>
                                    <Link>Our Policies</Link>
                                    {/* <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>
                                        83/4A Sahawas colony, Ingawale heights,near Karanje naka ,Satara
                                    </p> */}
                                </div>
                            </div>
                        </div>
                       
                        <div className="d-flex justify-content-end align-items-center mt-2 " style={{ gap: '25px' }}>
                            <a href='https://www.facebook.com' target='blank'>
                            <FontAwesomeIcon icon={faFacebook} style={{ color: 'blue', fontSize: '30px' }} />
                            </a>
                            <a href='https://instagram.com' target='blank'>
                            <FontAwesomeIcon icon={faInstagram} style={{ color: 'red', fontSize: '30px' }} />
                            </a>
                        </div>

                    </div>
                </div>
                <hr style={{height:'20px',color:'black',backgroundColor:'black'}}></hr>
             
            </footer>
        </>
    )
}

export default Footer